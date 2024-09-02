import Image from 'next/image'
import React from 'react'
interface props {
  label: string

}

export const  Empty = ({label }:props) => {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
        <div className=" relative h-56 w-72 object-cover ">
            <Image
                alt='Empty'
                src='/img/image.png'
                fill
            />
        </div>
        <p className='text-muted-foreground text-sm text-center '>{label}</p>  
    </div>
  )
}