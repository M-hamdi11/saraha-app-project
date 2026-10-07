import {deleteUserservice, getAllUserService, getUserprofileservice, loginUserservice, registerUserservice, updateuserpasswordservice, updateUserservice } from "./userservice.js"

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
     
       const addUser=await loginUserservice(req.validation)
       
    res.status(200).json({ message: 'user login succesfully' , token:addUser.token})


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