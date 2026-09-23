
export async function glopalerr(err,req,res,next){
  let message = err.message || "Something went wrong";
   const statusCode = err.status || 400;
   res.status(statusCode).json({message})

}