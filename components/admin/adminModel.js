import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import validator from 'validator';
const { isEmail } = validator;



const adminSchema = new Schema({
    name:{
        type: String,
        required: [true,'Please Insert your name']
    },
    email:{
        type: String,
        required: [true, 'Please Insert your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please provide a valid email']
    },
    mobileNo:{
        type: Number,
        required:[true,'Please Enter your Mobile No']
    },
    password:{
        type: String,
        required: [true, 'Please Enter the Password'],
        minlength: [8,'Password sould be greater than 8 character'],
        maxlength: [16,'Password sould less than 16 character'],
        select: false
    },
    passwordConfirm:{
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (element){
                return element === this.password;
            },
            message: 'Password must be same'

        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    

});



// Create Model out of Schema
const Admin = model('Admin', adminSchema);

export default Admin;