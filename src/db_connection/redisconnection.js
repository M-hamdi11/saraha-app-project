import { createClient } from "redis"
import { error_handler } from "../errorHandling/errorclass.js";

export const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", function(err) {
  throw err;
});

export async function redisconnected(){
    if(await client.connect()){
        console.log('redis connected')

    }else{
        throw new error_handler('something went wrong with redis connection')
    }
}



