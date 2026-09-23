import { Router } from "express";
import { deleteUsercontroller, getAllUsercontroller, getUserprofilecontroller, loginUsercontroller, registerUsercontroller, updateUsercontroller } from "./usercontroller.js";
const userrouter=Router();

userrouter.post('/register',registerUsercontroller)

userrouter.post('/login',loginUsercontroller)

userrouter.patch('/update-user/:id',updateUsercontroller)

userrouter.delete('/delete-user/:id',deleteUsercontroller)

userrouter.get('/profile/:id',getUserprofilecontroller)

userrouter.get('/',getAllUsercontroller)

export default userrouter;