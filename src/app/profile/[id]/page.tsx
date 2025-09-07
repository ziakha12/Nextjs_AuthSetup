import React from 'react'

interface paramsId {
    id : string
}

export default function page({params} : {params : paramsId}) {
  return (
    <div className='bg-black w-full h-screen flex flex-col justify-center items-center'>
      <h1 className='text-neutral-300 text-2xl font-semibold text-shadow-2xs'>Profile</h1>
      <span className='bg-neutral-400 rounded p-2 text-black text-2xl shadow-sm shadow-neutral-100'>{params.id}</span>
    </div>
  )
}
