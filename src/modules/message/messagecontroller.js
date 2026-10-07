import { getusermessageservice, sendmessageservice } from "./messageservice.js"

export async function sendmessagecontroller(req,res,next){
    try{
      const sendmessage=await sendmessageservice(req.body)
      res.status(200).json({message: 'message sent successfully'})

    }catch(err){
        next(err)
    }
}
export async function getusermessagescontroller(req,res,next){
    try{
        const messages=await getusermessageservice(req.user.id)
        res.status(200).json({all_messages:messages})

    }catch(err){
        next(err)
    }
}