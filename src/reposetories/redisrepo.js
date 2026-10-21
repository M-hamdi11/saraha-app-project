import { client } from "../db_connection/redisconnection.js";
export async function redissetitem(key, value, ttlSeconds) {
    if (ttlSeconds) {
        return await client.set(key, value, { EX: ttlSeconds });
    }
    return await client.set(key, value);
}

export async function redisgetitem(key) {
    return await client.get(key);
}

export async function redisdeleteitem(key) {
    return await client.del(key);
}

export async function redisitemexists(key) {
    return (await client.exists(key)) === 1;
}

export async function redisgetttl(key) {
    return await client.ttl(key);
}
const BLACKLIST_PREFIX = "blacklist:";
export async function add_tokens_id_blacklist(jti, exp) {
  const ttl = exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) {
    await client.set(`${BLACKLIST_PREFIX}${jti}`, "revoked", { EX: ttl });
  }
}
export async function isblacklisted(jti){
 return(await client.EXISTS(`${BLACKLIST_PREFIX}${jti}`)===1)
}