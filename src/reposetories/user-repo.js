import { UserModel } from "../models/User-Model/User.js";
import base_repo from "./base-repo.js";

export default class User_Repo extends base_repo {
    constructor() {
        super(UserModel)
    }
    finduserbyemail(email) {
        return this.finddocument({ email })
    }
    GetUserProfile(filter) {
        return this.model.findById(filter).select({
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
        })

    }
    GetAllUserDocuments(){
             return this.model.find().select({
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
        })
    }
}

