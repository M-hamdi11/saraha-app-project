import { error_handler } from "../../errorHandling/errorclass.js";
import User_Repo from "../../reposetories/user-repo.js";
import { decryption, encryption } from "../encryption/phoneencryption.js";
import { hashpass } from "../hashing/hashpassword.js";

const AdminModel = new User_Repo()
export async function CreateAdminservice(body) {
    const existingemail = await AdminModel.finduserbyemail(
        body.email
    );

    if (existingemail) {
        throw new error_handler('this email already exist')
    }
    body.phone = encryption(body.phone);
    body.password = await hashpass(body.password);
    await AdminModel.createdocument({
        ...body,
        role: "admin"
    })

}