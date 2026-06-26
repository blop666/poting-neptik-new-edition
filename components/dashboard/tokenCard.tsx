import React from 'react'
import { IconType } from 'react-icons';

interface compType {
    name: string;
    logo: IconType;
    total: number
}


export const TokenCard = ({name, logo: Logo, total}: compType) => {
  return (
    <div className='bg-white  border-gray-300 rounded-lg border px-2 py-3 flex flex-row gap-2'>
        <div className="w-14 h-14 bg-red-50 flex items-center justify-center rounded-full shrink-0">
            <Logo className='w-5 h-5  text-red-500' />
        </div>

        <div className="flex text-left flex-col ">
            <span className='text-gray-400 text-[10px] font-normal'>{name}</span>
            <span className='text-black text-xl font-medium'>{total}</span>
        </div>
    </div>
  )
}
