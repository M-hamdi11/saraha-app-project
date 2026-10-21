import { Router } from "express";
import { deleteUserprofilecontroller, forgotpasswordcontroller, getUserprofilecontroller, log_out_controller, loginUsercontroller, refreshtokencontroller, registerUsercontroller, resendOtpcontroller, resetpasswordcontroller, updateuserpasswordcontroller, updateUserprofilecontroller, verifyemailcontroller, verifyForgetPassOtpcontroller } from "./usercontroller.js";
import { verify_token_middleware } from "../../utils/verifytokenmeddleware/verifytoken.js";

import { authmiddleware } from "../../utils/authenticationMiddleware/validationmiddleware.js";
import { loginschema } from "../../utils/authenticationMiddleware/loginauth.js";
import { registerSchema } from "../../utils/authenticationMiddleware/registerauth.js";
import { updateProfileSchema } from "../../utils/authenticationMiddleware/updateprofileauth.js";
import { verify_refresh_token_middleware } from "../../utils/verify-refresh-token-middleware/verefyrefreshtoken.js";
import { forgotPasswordSchema, resendOtpSchema, resetPasswordSchema, updatePasswordSchema, verifyEmailSchema } from "../../common/schemas/otp-auth.js";
import { otpField } from "../../common/schemas/commonschemas.js";
const userrouter=Router();

userrouter.post('/register',authmiddleware(registerSchema),registerUsercontroller)

userrouter.post('/login',authmiddleware(loginschema),loginUsercontroller)

userrouter.patch('/update-profile',authmiddleware(updateProfileSchema),verify_token_middleware,updateUserprofilecontroller)

userrouter.get('/profile',verify_token_middleware,getUserprofilecontroller)

userrouter.patch('/update-password',verify_token_middleware,authmiddleware(updatePasswordSchema),updateuserpasswordcontroller)

userrouter.delete('/delete-profile',verify_token_middleware,deleteUserprofilecontroller)

userrouter.post('/refresh-token', refreshtokencontroller) 

userrouter.post('/log-out',verify_token_middleware,verify_refresh_token_middleware,log_out_controller ) 

userrouter.post('/verify-email',verify_token_middleware,authmiddleware(otpField),verifyemailcontroller) 

userrouter.post('/resend-otp',verify_token_middleware,resendOtpcontroller)

userrouter.post('/forgot-password',authmiddleware(forgotPasswordSchema),forgotpasswordcontroller)

userrouter.post('/verify-otp',authmiddleware(verifyEmailSchema),verifyForgetPassOtpcontroller)

userrouter.post('/reset-pass',authmiddleware(resetPasswordSchema),resetpasswordcontroller)

export default userrouter;