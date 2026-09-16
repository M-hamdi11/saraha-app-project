import { UserModel } from "../../models/User-Model/User.js";
import { decryption, encryption } from "../../utils/encryption/phoneencryption.js";
import { comparepasswords, hashpass } from "../../utils/hashing/hashpassword.js";

export async function registerUserservice(body) {
    const { phone, password } = body;
    body.phone = encryption(phone);
    body.password = await hashpass(password)
    const { email } = body
    const finduser = await UserModel.findOne({ email })
    if (finduser) {
        throw new Error('this email already exist')
    }
    const addUser = await UserModel.create(body)
}

export async function loginUserservice(body) {
    const { email, password } = body
    const finduser = await UserModel.findOne({ email })
    if (!finduser) {
        throw new Error('invalid email or password')
    }

    const comparepass = await comparepasswords(password, finduser.password)
    if (!comparepass) {
        throw new Error('invalid email or password')
    }

    finduser.phone = decryption(finduser.phone)

    return finduser

}

export async function updateUserservice(body, id) {
    const userexist = await UserModel.findById(id)
    if (!userexist) {
        throw new Error('user not found')
    }
    const isemailexist = await UserModel.findOne({ email: body.email })
    if (isemailexist) {
        throw new Error('email already taken choose another one ')
    }
    const updateduser = await UserModel.updateOne(body)

    return updateduser;

}

export async function deleteUserservice(id) {
    const isuserexist = await UserModel.findById(id)
    if (!isuserexist) {
        throw new Error('user not found')
    }
    const deleteuser = await UserModel.deleteOne({ _id: id })
    return deleteuser;
}
export async function getUserprofileservice(id) {
    const getUser = await UserModel.findById(id).select({
        firstName: 1,   
        lastName: 1, 
        email: 1,
        phone: 1,
    })
    if (!getUser) {
        throw new Error('user not found')

    }
    getUser.phone = decryption(getUser.phone);
    return getUser;
}
