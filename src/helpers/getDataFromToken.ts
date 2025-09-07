import { log } from 'console';
import Jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'


export async function getData(request : NextRequest){
    try {
        const token:string | any = await request.cookies.get('token')?.value;
        console.log(token)
        const decodedToken:any = Jwt.verify(token, process.env.JWT_SECRET_TOKEN!)

        console.log('token', decodedToken.id)
        return decodedToken.id;
        
    } catch (error : any) {
        console.log(error.message)
        throw new Error(error.message)
    }
}