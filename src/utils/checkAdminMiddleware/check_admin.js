import { error_handler } from "../../errorHandling/errorclass.js"

export async function check_admin(req,res,next) {
    try{
        if(req.user.role!=='admin'){
            throw new error_handler('must be admin')
        }
        next()

    }catch(err){
        next(err)
    }
    
}