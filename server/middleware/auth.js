import jwt from "jsonwebtoken";

export const isAuthenticated =(req,res,next)=>{
    const token = req.headers.authorization;
    console.log(token)
    if(!token){
       return res.sendStatus(401).json({message:"You are not Logged In"})
    }else {
        jwt.verify(authHeader,process.env.JWT_SECRET,(err)=>{
            if(err) 
            {return res.sendStatus(403) }
            next();
        })
      }
}


export const authorizeRoles = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.sendStatus(403).json({message:`Role: ${req.user.role} is not allowed to access this resource`})
        }
        next()
    }
}