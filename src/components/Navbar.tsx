'use client'
import React,{useEffect} from 'react';
import { Button } from "@/components/ui/button";
import {Menu, Sun, MoonStar} from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Mobilebar from './Mobilebar';

export const Navbar = () => {
  
  const [theme, setTheme] = React.useState('light');
  const [login, setLogin] = React.useState(false);

  const changeTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setTheme('dark');
    }
  };

  useEffect(() => {
    const isLogin = Cookies.get('__session_3gCryqYE'); 
    if (isLogin) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);



  return (
    <nav className="flex fixed w-full z-20 bg-white dark:bg-black items-cente py-4 ">
      <div className="flex w-full items-center justify-between px-5 lg:px-8">
        <div className=" w-full lg:w-1/2 flex justify-between">
          <Link  href="/" className=' font-Alice capitalize text-xl lg:text-2xl'>{process.env.NEXT_PUBLIC_PROJECTNAME}</Link>
          <div className=" flex gap-3 md:hidden">
            {theme === 'dark' ? <Sun onClick={changeTheme}/> : <MoonStar onClick={changeTheme}/>}
            <UserButton />
            <Mobilebar />
          </div>
        </div>
          <div className='hidden md:flex justify-end items-center gap-3 w-1/2'>
            {theme === 'dark' ? <Sun onClick={changeTheme}/> : <MoonStar onClick={changeTheme}/>}
            {login && <UserButton /> }
          </div>

      </div>
    </nav>
  );
};