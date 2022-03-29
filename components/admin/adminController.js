import logger from "../../config/logger"
import Admin from "./adminModel"

export const createAdmin = async(req,res,next) =>{
    try{
        logger.info("adminController")
        const {name,email,contactNo,password,confirmPassword}= req.body

        const isExist = await Admin.findOne({email})

        if(isExist){
            return res.status(409).json({
                message:"Email is alredy registered"
            })
        }
        const admin = await Admin.create({
            name,
            email,
            contactNo,
            password,
            confirmPassword
    
    
        })
        res.status(200).json({
            message:"Registration success"
        })
    }catch(error){
        next(new Error(error));
    }
}