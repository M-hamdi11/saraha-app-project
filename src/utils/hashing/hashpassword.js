import * as argon2 from "argon2"

export async function hashpass(pass){
 
    try{
        const hashpass=await argon2.hash(pass)
        return hashpass

    }catch(err){
        throw new Error("Error hashing password");
    }
}
export async function comparepasswords(password,hashedpassword){
try{
    const comparingresult=argon2.verify(hashedpassword,password)
    return comparingresult
}catch(err){
     throw new Error("Error comparing password");
}

}


