import logger from "../../config/logger"
import User from "./userModel"


export const registerUser = async (req,res,next)=>{
    try {
        logger.info("inside User Controller Register user")
        const {name,email,password,confirmPassword,contactNo} = req.body
        
        const isExist = await User.findOne({email})
        
        if(isExist){
            return res.status(409).json({
                message:"email is already registered"
            })
        }
    
        const user = await User.create({
            name,
            email,
            password,
            confirmPassword,
            contactNo
        })
    
        res.status(201).json({
            message:"registration success",
            data:user
    
        })
    } catch (error) {
        next(new Error(error));
    }
}

export const loginUser = async(req,res,next)=>{
    try {
        logger.info("inside user controller login user")
        const {email,password} = req.body

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        
        
        const isValid =await user.comparePassword(password)

        if(!isValid){
            return res.status(401).json({
                message:"invalid credentials"
            })
        }
        
        
        return res.status(200).json({
            message:"login success"
        })



    } catch (error) {
        next(new Error(error));
    }
}