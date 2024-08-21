"use client"
import { cn } from '@/lib/utils'
import { LayoutDashboard, User, Settings, LogOut, MessageSquare, ImageIcon, VideoIcon, Music } from 'lucide-react' // Import the necessary icons
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {

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
        }
    ]

    return (
        <aside className='w-full min-h-screen bg-white dark:bg-black py-20 text-black dark:text-white'>

            {/* md screen */}
            {route.map((item, index) => (
                <Link href={item.route} key={index} className='flex lg:hidden w-full justify-center gap-3 items-center p-2 hover:scale-125 duration-150'>
                    <item.icon className={cn("h-7 w-7 mr-3")} />
                </Link>
            ))}

            {/* lg screen */}
            {route.map((item, index) => (
                <Link href={item.route} key={index} className='hidden lg:flex w-full items-center py-2 px-7 hover:scale-105 duration-150'>
                    <item.icon className={cn("h-6 w-6 mr-2")} />
                    {item.name}
                </Link>
            ))}

        </aside>
    )
}

export default Sidebar