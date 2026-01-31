import { rateLimit } from "../../config/upstash.js";

export const myLimiter=async(req,res,next)=>{

       try {
             
            const {success}=await rateLimit.limit("my-first-limit")
            
            if(!success)return res.status(429).json({message:"too many request, failed to load"})
            next() 
 
       } catch (error) {
          
            console.error("Error initializing in rate limiting", error)
     
            next()
       }


}