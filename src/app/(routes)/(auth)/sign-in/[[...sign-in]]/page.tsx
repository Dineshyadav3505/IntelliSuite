import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className=" h-screen bg-white dark:bg-zinc-800 w-full flex justify-center items-center"><SignIn /></div>
}