import {deleteUserservice, getUserprofileservice, loginUserservice, registerUserservice, updateUserservice } from "./userservice.js"

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
       
    res.status(200).json({ message: 'user login succesfully' , user:addUser})


    }catch(err){
        next(err)
    }
}

export async function updateUsercontroller(req,res,next){
try{
    const {id}=req.params
    const updateduser= await updateUserservice(req.body,id)
    res.status(200).json({meaasge:'user updated suucesfully'})
       
 }catch(err){
    next(err)
}
}
export async function deleteUsercontroller(req,res,next){
    try{
      const deleteduser=await deleteUserservice(req.params.id)
      res.status(200).json({message:'User deleted suucesfully'})

    }catch(err){
        next(err)
    }
}
export async function getUserprofilecontroller(req,res,next){
    try{
        const getuser=await getUserprofileservice(req.params.id)
        res.status(200).json(getuser)

    }catch(err){
        next(err)
    }
}