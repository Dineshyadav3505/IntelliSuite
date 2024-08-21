import { Menu} from 'lucide-react'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar from './Sidebar'

const Mobilebar = () => {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className=''/>
        </SheetTrigger>
        <SheetContent side="left" className=" p-0 ">
            <Sidebar/>
        </SheetContent>
    </Sheet>
  )
}

export default Mobilebar