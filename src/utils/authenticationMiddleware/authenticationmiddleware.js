export function authmiddleware(schema){
   return(req,res,next)=>{
        const result = schema.safeParse(req.body);
      
        if (!result.success) {
            const error = result.error.issues[0];

            return res.status(400).json({
                message: error.message,
                field: error.path
            });
        }
         req.validation=result.data

        next();
    };

    }
