import {deleteUserservice, forgotpasswordservice, getAllUserService, getUserprofileservice, log_out_service, loginUserservice, refreshtokenservice, registerUserservice, resendOtpservice, resetpasswordservice, updateuserpasswordservice, updateUserservice, verifyemailservice, verifyForgetPassOtpService } from "./userservice.js"

export async function registerUsercontroller(req,res,next){
    try{
        const addUser=await registerUserservice(req.body)
        res.status(201).json({message:'user created succesfully'})

    }catch(err){
        next(err)
    }
}
export async function loginUsercontroller(req,res,next){
    try{
     
       const addUser=await loginUserservice(req.body)
       
    res.status(200).json({ message: 'user login succesfully' , token:addUser.token,refreshtoken:addUser.refreshtoken})


    }catch(err){
        next(err)
    }
}


export async function updateUserprofilecontroller(req,res,next){
try{
    const {id}=req.user
    const updateduser= await updateUserservice(req.body,id)
    res.status(200).json({meaasge:'user updated suucesfully'})
       
 }catch(err){
    next(err)
}
}
export async function deleteUserprofilecontroller(req,res,next){
    try{
      const deleteduser=await deleteUserservice(req.user.id)
     
      res.status(200).json({message:'User deleted suucesfully'})

    }catch(err){
        next(err)
    }
}
export async function getUserprofilecontroller(req,res,next){
    try{
        const getuser=await getUserprofileservice(req.user.id)
        res.status(200).json(getuser)

    }catch(err){
        next(err)
    }
}
export async function getAllUsercontroller(req,res,next){
try{
    const allusers=await getAllUserService()
    res.status(200).json({users:allusers})
}catch(err){
    next(err)
}

}

export async function updateuserpasswordcontroller(req,res,next){
    try{
        const updateuserpass=await updateuserpasswordservice(req.user.id,req.body.newpassword) 
        res.status(200).json({message:"password updated successfully"})    

    }catch(err){
        next(err)
    }

}

export async function refreshtokencontroller(req, res, next) {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({ message: 'refresh token is required' })
    }
    const accesstoken = await refreshtokenservice(refreshToken)
    res.status(200).json({ message: 'token refreshed successfully', token: accesstoken })
  } catch (err) {
    next(err)
  }
}

export async function log_out_controller(req,res,next){
    try{

        const logout=await log_out_service(req.accesstoken,req.refreshtoken)
        
        res.status(200).json(logout)

    }catch(err){
        next(err)
    }
}

export async function verifyemailcontroller(req,res,next){
    try{
        const verify_email=await verifyemailservice(req.body,req.user)
        res.status(200).json(verify_email)

    }catch(err){
        next(err)
    }
}

export async function resendOtpcontroller(req,res,next){
    try{
        const resendOtp=await resendOtpservice(req.user.email) 
        res.status(200).json(resendOtp)

    }catch(err){
        next(err)
    }
}

export async function forgotpasswordcontroller(req,res,next){
    try{
        const forgotpassreply=await forgotpasswordservice(req.body.email)
        res.status(200).json(forgotpassreply)
    }catch(err){
        next(err)
    }
}

export async function verifyForgetPassOtpcontroller(req,res,next){
    try{
        const resettoken=await verifyForgetPassOtpService(req.body.email,req.body.otp)
        res.status(200).json({resettoken:resettoken})

    }catch(err){
        next(err)
    }
}

export async function resetpasswordcontroller(req,res,next){
    try{
        const resetpassresponse=await resetpasswordservice(req.body.resetToken,req.body.newpassword)
        res.status(200).json(resetpassresponse)
    }catch(err){
        next(err)
    }
}