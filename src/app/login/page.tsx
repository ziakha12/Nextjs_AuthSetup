"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export default function page() {

    const router = useRouter()

    const [user, setuser] = React.useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = React.useState<Boolean>(false)
    const [buttonDisable, setButtonDisable] = React.useState<Boolean>(true)


    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisable(false)
        }
        else {
            setButtonDisable(true)
        }
    }, [user])


    const onLogin = async () => {

        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log(response.data)
            toast.success(response.data.message)
            router.push(`/profile/1`)
        }
        catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex w-full justify-center items-center h-screen bg-black'>
            <Toaster/>
            <div className='flex flex-col gap-4 max-w-2xl w-full border-gray-400 border p-4 rounded-lg'>
                <h3 className='text-start text-3xl font-semibold text-gray-300'>{loading ? 'proccessing...' : "Login"}</h3>
                <div className='flex flex-col gap-1' >
                    <label className='text-white text-2xl'>Email</label>
                    <input
                        className='bg-gray-300 rounded-lg py-2 px-4 placeholder:text-slate-900 text-slate-900'
                        value={user.email}
                        placeholder='Enter your email'
                        onChange={(e) => setuser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-white text-2xl'>Password</label>
                    <input
                        className='bg-gray-300 rounded-lg py-2 px-4 placeholder:text-slate-900 text-slate-900'
                        value={user.password}
                        onChange={(e) => setuser({ ...user, password: e.target.value })}
                        placeholder='Enter your password'
                    />
                </div>
                <button
                    onClick={onLogin}
                    className={`${buttonDisable ? 'opacity-30' : 'opacity-100 cursor-pointer hover:scale-[0.9]'} bg-transparent border-gray-400 border-2 text-2xl text-gray-300 rounded-lg py-2 px-4 hover:bg-gray-400 hover:text-black  transition-all`}>Login</button>                <div className='flex items-center gap-2'>
                    <span className='text-xl text-gray-300 '>Don't have account :</span>
                    <Link href={'/signup'} className='text-xl text-blue-500 font-semibold underline '>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
