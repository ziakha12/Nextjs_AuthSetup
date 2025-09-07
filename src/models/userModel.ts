import mongoose, { Schema, Document } from "mongoose";


interface UserInterface extends Document {
    username: string,
    email: string,
    password: string,
    verifyToken?: string,
    verifyTokenExpiry?: Date,
    isVerified?: boolean,
    forgetPasswordToken?: string,
    forgetPasswordTokenExpiry?: Date
}


const userSchema = new Schema<UserInterface>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date
},
{
    timestamps: true
}
)


const User = mongoose.models.users || mongoose.model('User', userSchema)

export default User