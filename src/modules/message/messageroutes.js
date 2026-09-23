import { Router } from "express";
import { getusermessagescontroller, sendmessagecontroller } from "./messagecontroller.js";
const messagerouter=Router()

messagerouter.post('/',sendmessagecontroller)


messagerouter.get('/:id',getusermessagescontroller)


export default messagerouter;