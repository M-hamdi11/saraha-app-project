import { createClient } from "redis"
import { error_handler } from "../errorHandling/errorclass.js"

export const client = createClient({
  url: process.env.REDIS_URL,
})

client.on("error", (err) => {
 throw error_handler(err)
})

await client.connect()
console.log("redis connected")


