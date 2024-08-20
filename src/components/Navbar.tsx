import React from 'react';
import { Button } from "@/components/ui/button";
import {Menu } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export const Navbar = () => {
//   const { isSignedIn } = useUser(); // Use useUser to get the authentication state

  return (
    <nav className="flex items-cente py-4 ">
      <div className="flex w-full items-center justify-between px-5 lg:px-8">
        <div className=" w-full lg:w-1/2 flex justify-between">
          <h1 className=' font-Alice capitalize text-xl lg:text-2xl'>{process.env.NEXT_PUBLIC_PROJECTNAME}</h1>
          <Menu className='md:hidden' />
        </div>
          <div className='hidden md:flex justify-end items-center gap-3 w-1/2'>
            <UserButton /> 
                <Button>
                <Link href="/sign-up">Sign Up</Link>
                </Button>

                <Button>
                <Link href="/sign-in">Sign  In</Link>
                </Button>
          </div>

      </div>
    </nav>
  );
};