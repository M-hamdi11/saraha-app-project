import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import { client } from '../../db_connection/redisconnection.js'

export const limiter=rateLimit({
   windowMs: 5 * 60 * 1000,
   limit:5,
   store:new RedisStore({
    sendCommand: (...args) => client.sendCommand(args),
   })
})