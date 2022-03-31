import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";
const { isEmail } = validator;
import bcrypt from "bcrypt";

// creating User schema

const adminSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Insert your name"],
  },
  email: {
    type: String,
    required: [true, "Please Insert your email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please provide a valid email"],
  },
  mobileNo: {
    type: Number,
    required: [true, "Please Enter your Mobile No"],
  },
  password: {
    type: String,
    required: [true, "Please Enter the Password"],
    minlength: [8, "Password sould be greater than 8 character"],
    maxlength: [16, "Password sould less than 16 character"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (element) {
        return element === this.password;
      },
      message: "Password must be same",
    },
  },
});

// hashing password before save using bcrypt
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPass = await bcrypt.hash(this.password, 10);
    this.password = hashPass;
    this.confirmPassword = undefined;
    next();
  }
  next();
});

// compare password function
adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//hide password from doc
adminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObj = admin.toObject();
  delete adminObj.password;
  return adminObj;
};

// Create Model out of Schema
const Admin = model("Admin", adminSchema);

export default Admin;
