import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt'

connect()

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) return NextResponse.json({ error: "all feilds are required" }, { status: 401 });

        const ExistedUser = await User.findOne({ email });

        if (ExistedUser) return NextResponse.json({ error: "user with same email is already exist" }, { status: 401 });

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            email,
            password : hashedPassword
        })

      const savedUser = await user.save()

      console.log(savedUser)

        return NextResponse.json({
            message : 'user created successfully',
            savedUser,
            success : true
        })


    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}