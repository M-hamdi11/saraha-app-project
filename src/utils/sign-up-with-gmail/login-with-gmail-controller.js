import { signinwithgmailService, signupwithgmailService } from "./login-with-gmail-service.js";

export async function signupwithgmailcontroller(req,res,next){
try{
    const { idToken } = req.body; 
    const signupres=await signupwithgmailService(idToken)
    res.status(200).json({message:'user logged in successfully',token:signupres})

}catch(err){
    next(err)
}

}

export async function signinwithgmailcontroller(req,res,next){
try{
    const { idToken } = req.body; 
    const signinres=await signinwithgmailService(idToken)
    res.status(200).json({message:'user logged in successfully',token:signinres})

}catch(err){
    next(err)
}

}