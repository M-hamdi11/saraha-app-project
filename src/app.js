import './config/env.js'
import express from 'express'
import { glopalerr } from './globalerr.js';
import { connectdb } from './db_connection/db.js';
import { sendmail_connection } from './common/clients/nodemailer.js';
import userrouter from './modules/users/userroutes.js'
import messagerouter from'./modules/message/messageroutes.js'
import adminrouter from './utils/admins/adminsroute.js'
import gmailrouter from './utils/sign-up-with-gmail/gmailroutes.js'
import cors from 'cors';
import helmet from 'helmet';
import path from 'path'

const app=express();

app.use(helmet());

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json())

app.use('/uploads', express.static(path.resolve('uploads'),{
     index: false,     
    dotfiles: 'deny'
}))

app.use('/users',userrouter)

app.use('/messages',messagerouter)

app.use('/admins',adminrouter)

app.use('/api/auth/gmail',gmailrouter)

app.use(glopalerr)

app.listen(3000 ,async ()=>{
await connectdb()
await sendmail_connection()
console.log('server runninggggggggg')

})


