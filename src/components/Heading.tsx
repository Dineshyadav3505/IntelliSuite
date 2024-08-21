import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    bgColor?: string;
    iconColor?: string;
}
export const Heading = ({
    title, 
    description, 
    icon :Icon, 
    bgColor, 
    iconColor
}:HeadingProps) => {

    return (
        <div className="text-black dark:text-white w-full flex py-2 items-center gap-3 ">
            <span className={cn("p-1 rounded-sm", bgColor)}>
                <Icon className={cn("h-14 w-14 ", iconColor)}/>
            </span>
            <div className="">
                <h2 className=" text-xl lg:text-3xl capitalize font-Overpass">{title}</h2>
                <h6 className="text-sm lg:text-base text-zinc-500 capitalize">{description}</h6>
            </div>
        </div>
    )
}