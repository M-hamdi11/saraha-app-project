import { Router } from "express";
import { getusermessagescontroller, sendmessagecontroller } from "./messagecontroller.js";
import { verify_token_middleware } from "../../utils/verifytokenmeddleware/verifytoken.js";
const messagerouter=Router()

messagerouter.post('/',sendmessagecontroller)


messagerouter.get('/all-messages',verify_token_middleware,getusermessagescontroller)


export default messagerouter;