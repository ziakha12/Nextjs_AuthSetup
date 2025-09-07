import { getData } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import connect from "@/dbConfig/dbConfig";


connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getData(request)

        const user = await User.findById(userId).select('-password')

        return NextResponse.json({
            user,
            message : 'user fetched',
            success : true
        })

    } catch (error : any) {
        console.log(error.message)
        return NextResponse.json({error : error.message}, {status : 500})
    }
}