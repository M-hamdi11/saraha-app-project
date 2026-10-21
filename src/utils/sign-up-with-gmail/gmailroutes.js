import { Router } from "express";
import { signinwithgmailcontroller, signupwithgmailcontroller } from "./login-with-gmail-controller.js";
const gmailrouter=Router()

gmailrouter.post('/register',signupwithgmailcontroller)
gmailrouter.post('/login',signinwithgmailcontroller)

export default gmailrouter