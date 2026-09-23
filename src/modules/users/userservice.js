import { UserModel } from "../../models/User-Model/User.js";
import { decryption, encryption } from "../../utils/encryption/phoneencryption.js";
import { comparepasswords, hashpass } from "../../utils/hashing/hashpassword.js";
import User_Repo from "../../reposetories/user-repo.js";
import { error_handler } from "../../errorHandling/errorclass.js";


const user_repo=new User_Repo()
export async function registerUserservice(body) {

    const { phone, password } = body;
    body.phone = encryption(phone);
    body.password = await hashpass(password)
    const { email } = body
    const finduser = await user_repo.finduserbyemail(email)
    if (finduser) {
        throw new error_handler('user already exist',401)
    }
    const addUser = await user_repo.createdocument(body)
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

    return finduser

}

export async function updateUserservice(body, id) {
    const userexist = await UserModel.findById(id)
    if (!userexist) {
        throw new error_handler('user not found')
    }

    if (body.email) {
        const isemailexist = await user_repo.finduserbyemail(body.email)
        if (isemailexist) {
            throw new error_handler('email already taken choose another one')
        }
    }

    if (body.phone) {
        body.phone = encryption(body.phone);
    }

    if (body.password) {
        body.password = await hashpass(body.password)
    }

    const updateduser = await user_repo.updatedocument({ _id: id }, body)

    return updateduser;
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
    const getAll=await user_repo.GetAllUserDocuments()
    if(!getAll){
        throw new error_handler('there are no users')
    }
    return getAll;

}
