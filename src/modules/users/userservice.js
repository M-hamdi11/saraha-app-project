
import { UserModel } from "../../models/User-Model/User.js";
import { decryption, encryption } from "../../utils/encryption/phoneencryption.js";
import { comparepasswords, hashpass } from "../../utils/hashing/hashpassword.js";
import User_Repo from "../../reposetories/user-repo.js";
import { error_handler } from "../../errorHandling/errorclass.js";
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const user_repo = new User_Repo()
export async function registerUserservice(body) {

    const { phone, password, email } = body;

    const finduser = await user_repo.finduserbyemail(email);

    if (finduser) {
        throw new error_handler('user already exist', 401);
    }

    body.role='user'
    body.phone = encryption(phone);
    body.password = await hashpass(password);

    return await user_repo.createdocument(body);
}

export async function loginUserservice(body) {
    const { email, password } = body
    const finduser = await user_repo.finduserbyemail(email)
    if (!finduser) {
        throw new error_handler('invalid email or password')
    }

    const comparepass = await comparepasswords(password, finduser.password)
    if (!comparepass) {
        throw new error_handler('invalid email or password')
    }

    finduser.phone = decryption(finduser.phone)
    const token = jwt.sign(
        {
            id: finduser._id,
            username: finduser.firstName,
            role:finduser.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            issuer: 'my-app',
            audience: 'my-app-users',
            expiresIn: '15m',
            jwtid: uuidv4()
        }
    )
    return { user: finduser, token }
}

export const updateUserservice = async (body,id) => {
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
export async function updateuserpasswordservice(id,newpassword){
    const finduser=await user_repo.finddocbyid(id)
    if(!finduser){
        throw new error_handler('user not found')
    }
    finduser.password= await hashpass(newpassword)
     finduser.passwordChangedAt = new Date() 
     await finduser.save()
   return finduser
}
