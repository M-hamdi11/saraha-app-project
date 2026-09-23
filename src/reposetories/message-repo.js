import MessageModel from "../models/message-model/messages.js";
import base_repo from "./base-repo.js";

export class Message_Repo extends base_repo{
 constructor(){
   super(MessageModel)
}
add_message(content,receiverId){
    return this.model.create(
       { content,
        receiverId
       }
    )
} 
get_user_messages(user_id){
    return this.model.find({
        receiverId:user_id
    })
}
}