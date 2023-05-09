const verifyRole=(requiredRole)=>{
    return async(req,res,next)=>{
        try{
            const{role:roleInDb}=req.user;
            if(requiredRole===roleInDb){
                return next()
            }

        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message||"Something went Wrong"
            })
        }
    }
}
 
export default verifyRole