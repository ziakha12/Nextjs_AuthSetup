import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

connect()


export async function POST(request : NextRequest) {
    try {
        const {password, email} = await request.json()
        if(!password || !email) {
            return NextResponse.json({error : 'all feilds are required'}, {status : 401})
        }
        console.log(password, email)
        const existedUser = await User.findOne({email})

        if(!existedUser){
            return NextResponse.json({error : 'user is not found'}, {status : 404})
        }

        console.log(existedUser)

        const isPasswordValid = await bcrypt.compare(password, existedUser.password)

        if(!isPasswordValid){
            return NextResponse.json({error : 'password is not valid'}, {status : 409})
        }

        const userData = {
            id : existedUser._id,
            email : existedUser.email,
            username : existedUser.username
        }

        const token =  JWT.sign(userData, process.env.JWT_SECRET_TOKEN!, {expiresIn : '1h'})

       const response =  NextResponse.json({
            message : 'user logged in successfully',
            success : true
        })

        response.cookies.set('token', token, { httpOnly : true})

        return response


    } catch (error : any) {
        console.log("error ::", error.message)
        return NextResponse.json({error : error.message}, {status:500})
    }
}