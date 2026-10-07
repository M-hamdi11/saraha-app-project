import { Router } from "express";
import { verify_token_middleware } from "../verifytokenmeddleware/verifytoken.js";
import { check_admin } from "../checkAdminMiddleware/check_admin.js";
import { CreateAdmincontroller, deleteUseradmincontroller, updateUseradmincontroller } from "./adminscontroller.js";
import { getAllUsercontroller} from "../../modules/users/usercontroller.js";
import {updateProfileSchemaAdmin } from "../authenticationMiddleware/updateprofileauth.js";
import { authmiddleware } from "../authenticationMiddleware/authenticationmiddleware.js";
import { registerSchema } from "../authenticationMiddleware/registerauth.js";
const adminrouter=Router();
 adminrouter.post('/create-admin',authmiddleware(registerSchema),verify_token_middleware,check_admin,CreateAdmincontroller)
 adminrouter.delete('/delete-user',verify_token_middleware,check_admin,deleteUseradmincontroller)
 adminrouter.patch('/update-user',verify_token_middleware,check_admin,authmiddleware(updateProfileSchemaAdmin),updateUseradmincontroller)
 adminrouter.get('/users',verify_token_middleware,check_admin,getAllUsercontroller)

export default adminrouter
