import React from 'react'
import { IconType } from 'react-icons'

interface compType {
    name: string
    total: number
    logo: IconType
    endName: string
}


export const CardStats = ({name, total, logo: Logo, endName}: compType) => {
  return (
    <div className='w-full flex flex-col gap-8  border border-gray-200 rounded-lg backdrop-blur-2xl bg-white justify-between p-5 '>
        <div className="flex flex-row items-center gap-3 text-left">
            <Logo className='w-8 h-8 text-red-600' />
            <span className='text-black font-bold text-xl'>{name}</span>
        </div>

        <div className="flex flex-row items-baseline gap-1.5 text-left">
            <span className='text-6xl font-bold text-[#B72025]'>{total}</span>
            <span className='text-3xl font-bold text-black'>{endName}</span>
        </div>
    </div>
  )
}
