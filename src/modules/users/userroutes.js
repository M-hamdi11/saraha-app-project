import { Router } from "express";
import { deleteUserprofilecontroller, getUserprofilecontroller, loginUsercontroller, registerUsercontroller, updateuserpasswordcontroller, updateUserprofilecontroller } from "./usercontroller.js";
import { verify_token_middleware } from "../../utils/verifytokenmeddleware/verifytoken.js";

import { authmiddleware } from "../../utils/authenticationMiddleware/authenticationmiddleware.js";
import { loginschema } from "../../utils/authenticationMiddleware/loginauth.js";
import { registerSchema } from "../../utils/authenticationMiddleware/registerauth.js";
import { updateProfileSchema } from "../../utils/authenticationMiddleware/updateprofileauth.js";
const userrouter=Router();

userrouter.post('/register',authmiddleware(registerSchema),registerUsercontroller)

userrouter.post('/login',authmiddleware(loginschema),loginUsercontroller)

userrouter.patch('/update-profile',authmiddleware(updateProfileSchema),verify_token_middleware,updateUserprofilecontroller)

userrouter.get('/profile',verify_token_middleware,getUserprofilecontroller)

userrouter.patch('/update-password',verify_token_middleware,updateuserpasswordcontroller)

userrouter.delete('/delete-profile',verify_token_middleware,deleteUserprofilecontroller)

export default userrouter;