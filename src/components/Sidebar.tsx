"use client";
import { cn } from '@/lib/utils';
import { 
    LayoutDashboard, 
    Signature, 
    Settings, 
    LogOut, 
    MessageSquare, 
    ImageIcon, 
    VideoIcon, 
    Music, 
    LogIn 
} from 'lucide-react'; // Import the necessary icons
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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
        },

    ];

    const signupin = [
        {
            name: "Sign Up",
            icon: Signature,
            route: "/sign-up"
        },
        {
            name: "Sign In",
            icon: LogIn,
            route: "/sign-in" // Fixed route to "/sign-in"
        }
    ]

    const pathname = usePathname();

    return (
        <aside className='w-full min-h-screen text-sm px-2 space-y-2 md:text-base overflow-hidden font-Overpass bg-white dark:bg-black py-20 text-black dark:text-white'>
            {/* Mobile screen */}
            {route.map((item, index) => (
                <Link 
                    href={item.route} 
                    key={index} 
                    className={`flex md:hidden w-full items-center gap-3 py-3 px-7 hover:scale-105 duration-200 rounded-sm hover:bg-zinc-500 ${
                        pathname === item.route ? 'dark:bg-zinc-800 bg-zinc-100' : ''
                    }`}
                >
                    <item.icon className={cn("h-6 w-6 mr-2")} />
                    {item.name}
                </Link>
            ))}

            {/* Medium screen */}
            {route.map((item, index) => (
                <Link 
                    href={item.route} 
                    key={index} 
                    className={`hidden md:flex lg:hidden w-full justify-center gap-3 items-center p-2 hover:scale-105 duration-150 rounded-sm hover:bg-zinc-500 ${
                        pathname === item.route ? 'dark:bg-zinc-800 bg-zinc-100' : ''
                    }`}
                >
                    <item.icon className={cn("h-6 w-6 mr-3")} />

                </Link>
            ))}

            {/* Large screen */}
            {route.map((item, index) => (
                <Link
                    href={item.route}
                    key={index}
                    className={`hidden lg:flex w-full items-center py-2 px-7 hover:scale-105 duration-150 rounded-sm ${
                        pathname === item.route ? 'dark:bg-zinc-800 bg-zinc-100' : ''
                    }`}
                >
                    <item.icon className={cn("h-6 w-6 mr-2")} />
                    {item.name}
                </Link>
            ))}
            {signupin.map((item, index) => (
                <Link
                    href={item.route}
                    key={index}
                    className={`hidden lg:flex w-full items-center py-2 px-7 hover:scale-105 duration-150 rounded-sm ${
                        pathname === item.route ? 'dark:bg-zinc-800 bg-zinc-100' : ''
                    }`}
                >
                    <item.icon className={cn("h-6 w-6 mr-2")} />
                    {item.name}
                </Link>
            ))}
        </aside>
    );
};

export default Sidebar;