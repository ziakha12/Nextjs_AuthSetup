"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {

    const { id } = useParams()
    return (
        <div className='flex justify-center items-center h-screen w-full text-white bg-black'>
            profile {id}
        </div>
    )
}
