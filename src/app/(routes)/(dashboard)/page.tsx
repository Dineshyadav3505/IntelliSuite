import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { 
  LayoutDashboard, 
  MessageSquare, 
  ImageIcon, 
  VideoIcon, 
  Music, 
  ChevronRight
} from 'lucide-react';

const Dashdoard = () => {

  const route = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        route: '/'
    },
    {
        name: 'Conversation',
        icon: MessageSquare,
        route: '/conversation'
    },
    {
        name: 'Image Generation', 
        icon: ImageIcon,
        route: '/image'
    },
    {
        name: 'Video Generation',
        icon: VideoIcon, 
        route: '/video'
    },
    {
        name: 'Music Generation',
        icon: Music, 
        route: '/music'
    },

];

  return (
    <div className='flex flex-col justify-center items-center text-black dark:text-white'>
      <h1 className='text-2xl py-4 md:text-3xl lg:text-5xl font-Alice capitalize'>Explore the power of the <span className=' uppercase'>ai</span> </h1>
      <h6 
      className='text-sm py-2 md:text-xl font-Overpass text-zinc-500'
      >
        Chat with the smartest AI - Experience the power of AI 
      </h6>

      <div className="mt-16 w-full h-full flex flex-col gap-3 ">
        {route.map((item, index) => (
        <Link href={item.route}  key={index} className="flex gap-3 justify-between items-center px-5 bg-zinc-300 dark:bg-zinc-800 mx-auto w-[80%] py-3 drop-shadow-md rounded-sm hover:px-3 duration-200">
          <span className='flex items-center gap-3'>
          <Button className="p-3 flex justify-center items-center bg-zinc-500"><item.icon className="h-6 w-6" /> </Button>
          <span className="text-sm md:text-base font-Overpass capitalize">{item.name}</span>
          </span>          
          <span className="text-sm md:text-base "> <ChevronRight /></span>
        </Link>
        ))}
      </div>
    
    </div>
  )
}

export default Dashdoard