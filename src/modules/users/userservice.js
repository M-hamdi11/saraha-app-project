
import { decryption, encryption } from "../../utils/encryption/phoneencryption.js";
import { comparepasswords, hashpass } from "../../utils/hashing/hashpassword.js";
import User_Repo from "../../reposetories/user-repo.js";
import { error_handler } from "../../errorHandling/errorclass.js";
import jwt from 'jsonwebtoken'
import { generaterefreshtoken, generatetoken } from "../../utils/createToken/generatetoken.js";
import { getSecretByRole } from "../../utils/createToken/getsecret.js";
import { add_tokens_id_blacklist, redisdeleteitem, redisgetitem, redisitemexists, redissetitem } from "../../reposetories/redisrepo.js";
import { create_otp } from "../../utils/create-otp/otp.js";
import { email_event } from "../../utils/events/sendmailevent.js";
import crypto from "crypto";

const user_repo = new User_Repo()
export async function registerUserservice(body) {

    const { phone, password, email } = body;

    const finduser = await user_repo.finduserbyemail(email);

    if (finduser) {
        throw new error_handler('user already exist', 401);
    }

    body.role = 'user'
    body.phone = encryption(phone);
    body.password = await hashpass(password);
    const otp = create_otp()
    console.log(otp)

    email_event.emit('send-otp-email', { email, otp })

    await redissetitem(`verify-otp:${email}`, otp, 5 * 60)

    return await user_repo.createdocument(body);
}

export async function loginUserservice(body) {
    const { email, password } = body
    const finduser = await user_repo.finduserbyemail(email)
    if (!finduser) {
        throw new error_handler('invalid email or password')
    }
    const failedAttemptsKey = `login-failures:${email}`
    const failedAttempts = Number(await redisgetitem(failedAttemptsKey)) || 0
    const comparepass = await comparepasswords(password, finduser.password)

    if (failedAttempts >= 5) {
        throw new error_handler("your login banned for 5 minutes")
    }

    if (!comparepass) {
        const nextFailedAttempts = failedAttempts + 1
        await redissetitem(failedAttemptsKey, String(nextFailedAttempts), 5 * 60)
        if (nextFailedAttempts >= 5) {
            throw new error_handler("your login banned for 5 minutes")
        }
        throw new error_handler('invalid email or password')

    }

    await redisdeleteitem(failedAttemptsKey)

    if (finduser.two_step_verification !== true) {
        finduser.phone = decryption(finduser.phone)

        const token = generatetoken(finduser)
        const refreshtoken = generaterefreshtoken(finduser)

        return { message:'user looged in succsessfully', token, refreshtoken }
    }
    const otp = create_otp()
    await redissetitem(`login-otp:${finduser.email}`, otp, 5 * 60)

    await redissetitem(`login-email`,finduser.email)

    email_event.emit('send-otp-email', { email: finduser.email, otp })
    return { message: 'the code has been sent, check your email' }
}

export async function confirmloginservice(email,otp) {
 const saved_otp=await redisgetitem(`login-otp:${email}`)
 if(!saved_otp){
    throw new error_handler('resend your otp')
 }
  if (String(otp) !== saved_otp) throw new error_handler('invalid otp')
  const user=await user_repo.finduserbyemail(email)
if(!user){
    throw new error_handler('user not found')
}
 user.phone = decryption(user.phone)
const token= generatetoken(user)
const refresh_token=generaterefreshtoken(user)
return {token:token,refresh_token:refresh_token}
    
}

export const updateUserservice = async (body, id) => {
    const userexist = await user_repo.finddocbyid(id)
    if (!userexist) {
        throw new error_handler('user not found')
    }

    const { firstName, lastName, email, phone } = body
    const updates = {}

    if (firstName) updates.firstName = firstName
    if (lastName) updates.lastName = lastName

    if (email) {
        const isemailexist = await user_repo.finduserbyemail(email)
        if (isemailexist && isemailexist._id.toString() !== id.toString()) {
            throw new error_handler('email already taken choose another one')
        }
        updates.email = email
    }

    if (phone) {
        updates.phone = encryption(phone)
    }

    const updateduser = await user_repo.updatedocument({ _id: id }, updates)
    return updateduser
}
export async function deleteUserservice(id) {
    const isuserexist = await user_repo.finddocbyid(id)
    if (!isuserexist) {
        throw new error_handler('user not found')
    }
    const deleteuser = await user_repo.deletedocument({ _id: id })
    return deleteuser;
}
export async function getUserprofileservice(id) {
    const getUser = await user_repo.GetUserProfile(id)
    if (!getUser) {
        throw new error_handler('user not found')

    }
    getUser.phone = decryption(getUser.phone);
    return getUser;
}
export async function getAllUserService() {
    const getAll = await user_repo.GetAllUserDocuments()
    if (!getAll) {
        throw new error_handler('there are no users')
    }
    return getAll;

}
export async function updateuserpasswordservice(id, newpassword) {
    const finduser = await user_repo.finddocbyid(id)
    if (!finduser) {
        throw new error_handler('user not found')
    }
    finduser.password = await hashpass(newpassword)
    finduser.passwordChangedAt = new Date()
    await finduser.save()
    return finduser
}
export async function refreshtokenservice(refreshtoken) {
    const unverified = jwt.decode(refreshtoken)
    if (!unverified || !unverified.role) throw new Error('invalid refresh token')

    const decoded = jwt.verify(refreshtoken, getSecretByRole(unverified.role, 'REFRESH'), {
        issuer: 'my-app',
        audience: 'my-app-users',
    })

    const user = await user_repo.finddocbyid(decoded.id)
    if (!user) throw new Error('user not found')

    if (user.passwordChangedAt) {
        const changedAt = Math.floor(user.passwordChangedAt.getTime() / 1000)
        if (decoded.iat < changedAt) throw new Error('token revoked, please login again')
    }

    return generatetoken(user)
}
export async function log_out_service(accesstoken, refreshtoken) {
    const { jti: accessjti, exp: accessexp } = accesstoken
    const { jti: refreshjti, exp: refreshexp } = refreshtoken
    await Promise.all([
        add_tokens_id_blacklist(accessjti, accessexp),
        add_tokens_id_blacklist(refreshjti, refreshexp),
    ])
    return { message: "logged out successfully" };

}

export async function verifyemailservice(body, user) {
    const { otp } = body;

    const finduser = await user_repo.finddocbyid(user.id);
    if (!finduser) {
        throw new error_handler("user not found", 404);
    }
    if (finduser.is_email_verified === true) {
        throw new error_handler("email already verified", 400);
    }

    const saved_otp = await redisgetitem(`verify-otp:${finduser.email}`);
    if (!saved_otp) {
        throw new error_handler("otp expired, please request a new one", 400);
    }
    if (saved_otp !== String(otp)) {
        throw new error_handler("invalid otp", 400);
    }

    await user_repo.updatedocument({ _id: finduser._id }, { is_email_verified: true });
    await redisdeleteitem(`verify-otp:${finduser.email}`);

    return { message: "email verified successfully" };
}
export async function resendOtpservice(email) {
    const genericMsg = { message: "if the email is registered and not verified, an otp has been sent" }

    const user = await user_repo.finduserbyemail(email)
   if (!user || user.is_email_verified) return genericMsg

    const saved_otp = await redisgetitem(`verify-otp:${email}`)
    if (saved_otp) return genericMsg

    const otp = create_otp()
    await redissetitem(`verify-otp:${email}`, otp, 5 * 60)
    email_event.emit('send-otp-email', { email, otp })

    return genericMsg

}
export async function forgotpasswordservice(email) {
    email = email.toLowerCase().trim()
    const existuser = await user_repo.finduserbyemail(email)
    if (!existuser) {
        throw new error_handler(`if the email exists, an otp has been sent`)
    }
    const saved_otp = await redisgetitem(`forgot-password:${email}`);
    if (saved_otp) {
        throw new error_handler("there is already otp")
    }
    const otp = create_otp()
    const hashedotp = await hashpass(otp)
    await redissetitem(`forgot-password:${email}`, hashedotp, 5 * 60)
    email_event.emit('send-otp-email', { email, otp })

    return { message: "if the email exists, an otp has been sent" }
}
export async function verifyForgetPassOtpService(email, otp) {
    email = email.toLowerCase().trim()
    const saved_otp = await redisgetitem(`forgot-password:${email}`)
    if (!saved_otp) throw new error_handler("otp expired or not found");
    if (!(await comparepasswords(String(otp), saved_otp))) {
        throw new error_handler("invalid otp", 400)
    }
    await redisdeleteitem(`forgot-password:${email}`)
    const resetToken = crypto.randomBytes(32).toString("hex");
    await redissetitem(`reset-token:${resetToken}`, email, 10 * 60)
    return { resetToken }
}

export async function resetpasswordservice(resetToken, newpassword) {
    const email = await redisgetitem(`reset-token:${resetToken}`)
    if (!email) {
        throw new error_handler('invalid or expired token')
    }
    const hashednewpass = await hashpass(newpassword)
    await user_repo.updatedocument({ email }, { password: hashednewpass })
    await redisdeleteitem(`reset-token:${resetToken}`)
    return { message: "password changed successfully" }

}
export async function changeprofilephotoservice(userId, file) {
    const userexist = await user_repo.finddocbyid(userId)
    if (!userexist) {
        throw new error_handler("user not found")
    }
    await user_repo.updatedocument({ _id: userexist._id }, { picture: file })
    return { message: "user profile picture changed succssefully" }

}

export async function two_step_verifications_service(userId) {
    const user = await user_repo.finddocbyid(userId)
    if (!user) throw new error_handler('user not found')
    if (user.two_step_verification === true) {
        throw new error_handler('2-step verification already enabled')
    }

    const otp = create_otp()
    await redissetitem(`2_step_verify:${user.email}`, otp, 5 * 60)
    email_event.emit('send-otp-email', { email: user.email, otp })

    return { message: 'the code has been sent, check your email' }
}

export async function compareotpservice(userId, otp) {
    const user = await user_repo.finddocbyid(userId)
    if (!user) throw new error_handler('user not found')

    const key = `2_step_verify:${user.email}`
    const saved_otp = await redisgetitem(key)
    if (!saved_otp) throw new error_handler('resend your otp')
    if (String(otp) !== saved_otp) throw new error_handler('invalid otp')

    user.two_step_verification = true
    await user.save()
    await redisdeleteitem(key)

    return { message: 'two-step-verification completed' }
}
