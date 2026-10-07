import dotenv from 'dotenv'

const envFile = process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env'

dotenv.config({ path: envFile })