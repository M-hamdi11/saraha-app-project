import { Router } from "express";
import { changeprofilephotocontroller, compareotpcontroller, confirmlogincontroller, deleteUserprofilecontroller, forgotpasswordcontroller, getUserprofilecontroller, log_out_controller, loginUsercontroller, refreshtokencontroller, registerUsercontroller, resendOtpcontroller, resetpasswordcontroller, two_step_verifications_controller, updateuserpasswordcontroller, updateUserprofilecontroller, verifyemailcontroller, verifyForgetPassOtpcontroller } from "./usercontroller.js";
import { verify_token_middleware } from "../../utils/verifytokenmeddleware/verifytoken.js";

import { authmiddleware } from "../../utils/authenticationMiddleware/validationmiddleware.js";
import { loginschema } from "../../utils/authenticationMiddleware/loginauth.js";
import { registerSchema } from "../../utils/authenticationMiddleware/registerauth.js";
import { updateProfileSchema } from "../../utils/authenticationMiddleware/updateprofileauth.js";
import { verify_refresh_token_middleware } from "../../utils/verify-refresh-token-middleware/verefyrefreshtoken.js";
import { forgotPasswordSchema, resendOtpSchema, resetPasswordSchema, updatePasswordSchema, verifyEmailSchema } from "../../common/schemas/otp-auth.js";
import { otpField } from "../../common/schemas/commonschemas.js";
import { uploads } from "../../utils/changeprofilephoto/multerchangephoto.js";
import { check_file_type } from "../../utils/checkfiletypemiddleware/checkfile.js";
import { limiter } from "../../utils/ratelimiting/loginratelimting.js";
const userrouter=Router();

userrouter.post('/register',limiter,authmiddleware(registerSchema),registerUsercontroller)

userrouter.post('/login',limiter,authmiddleware(loginschema),loginUsercontroller)

userrouter.post('/confirm-login',confirmlogincontroller)

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

userrouter.post('/change-photo',verify_token_middleware,uploads.single("profileImage"),check_file_type,changeprofilephotocontroller)

userrouter.post('/two-step-verfication',verify_token_middleware,two_step_verifications_controller)
userrouter.post('/confirm-2-step-otp',verify_token_middleware,compareotpcontroller)


export default userrouter;