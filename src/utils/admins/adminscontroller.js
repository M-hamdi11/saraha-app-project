import { error_handler } from "../../errorHandling/errorclass.js"
import { deleteUserservice, updateUserservice } from "../../modules/users/userservice.js"
import { CreateAdminservice } from "./adminservice.js"

 export async function CreateAdmincontroller(req,res,next){
    try{
     const createAdmin=await CreateAdminservice(req.body)
     res.status(200).json({message:'admin created successfully'})

    }catch(err){ 
        next(err)
    }
 }
 export async function updateUseradmincontroller(req,res,next){
 try{
     const {id}=req.body
     if(!id){
        throw new error_handler('there is no id in body please select id')
     }
     const updateduser= await updateUserservice(req.body,id)
     res.status(200).json({meaasge:'user updated suucesfully'})
        
  }catch(err){
     next(err)
 }
}

export async function deleteUseradmincontroller(req,res,next){
    try{
      const deleteduser=await deleteUserservice(req.body.id)
      res.status(200).json({message:'User deleted suucesfully'})

    }catch(err){
        next(err)
    }
}