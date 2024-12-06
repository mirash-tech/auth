import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, "Please enter a username"] ,
        unique: true,
        minlength: 5,
        maxlength: 20
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 5,
        maxlength: 1000
    },
    email: {
        type: String,
        required: [true,"Please enter an email address"],
        unique: true
    },
  
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    
    forgotPasswordToken:String,
    forgotPasswordExpires: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;