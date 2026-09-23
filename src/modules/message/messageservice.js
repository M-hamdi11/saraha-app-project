import { error_handler } from "../../errorHandling/errorclass.js"
import { Message_Repo } from "../../reposetories/message-repo.js"
const Message_model=new Message_Repo()

export async function sendmessageservice(body){
const{content, receiverId}=body
const addmessage=await Message_model.add_message(content,receiverId)
if(!addmessage){
    throw new error_handler('something worng happen when adding')
}
return addmessage

}
export async function getusermessageservice(id){
    const messages=await Message_model.get_user_messages(id)
    if(messages.length===0){
        throw new error_handler('no messages for this user')
    }
    return messages;
}