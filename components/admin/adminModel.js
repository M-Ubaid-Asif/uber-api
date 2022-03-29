import mongoose from "mongoose";
import validator from "validator"
import bcrypt from 'bcrypt'




// creating admin schema
const adminShcema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        validate:[validator.isEmail,"Invalid email"]
    },
    contactNo:{
        type:Number,
        required:[true,"please provide contact number"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    confirmPassword:{
        type:String,
        required:[true,"confirm password is required"],
        // check confirm password is match with password or not
        validate:{
            validator:function(cpass){
                return cpass === this.password;
            },
            message:"password do not match"
        }
    }
}) 



// hashing password before save using bcrypt
adminShcema.pre("save",async function(next){
    if(this.isModified("password")){
        const hashPass =await bcrypt.hash(this.password,10);
        this.password = hashPass
        next();
    }
    next();
})



const Admin  = mongoose.model("Admin",adminShcema);


export default Admin