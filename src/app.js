import express from 'express'
import { glopalerr } from './globalerr.js';
import { connectdb } from './db_connection/db.js';
import userrouter from './modules/users/userroutes.js'

const app=express();

app.use(express.json())

app.use('/users',userrouter)





app.use(glopalerr)


app.listen('3000',async ()=>{
await connectdb()
console.log('server runninggggggggg')

})

