"use client"
import React from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function page() {

    const router = useRouter()

    const [userUrl, setUserUrl] = React.useState<string | null>(null)

    const logout = async () => {
        try {
            const res = await axios.get('/api/users/logout')
            toast.success(res.data.message)
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUser = async () => {
        try {
            const res = await axios.get('/api/users/me')
            setUserUrl(res.data.user._id)
            toast.success(res.data.message)
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }

    }

    return (
        <div className='bg-black w-full h-screen flex flex-col justify-center items-center'>
            <Toaster />
            <h1 className='text-neutral-300 text-2xl font-semibold text-shadow-2xs'>Profile Page</h1>
            <Link href={`/profile/${userUrl}`} className='my-2 bg-neutral-100 px-3 py-2'>{userUrl ? userUrl : "nothing"}</Link>
            <button className='bg-neutral-300 border border-neutral-400 text-black rounded px-4 py-1 cursor-pointer hover:scale-[1.1]' onClick={logout}>Logout</button>
            <button className='bg-blue-500 border border-blue-600 text-white rounded px-4 py-1 cursor-pointer hover:scale-[1.1]' onClick={getUser}>Get User Details Link</button>
        </div>
    )
}
