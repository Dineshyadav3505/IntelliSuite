import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ 
    children 
}: { 
    children : React.ReactNode
}) => {
    return(
        <div className=" h-full relative py-0">
            <Navbar/>
            <div className="hidden h-full md:flex mf:flex-col md:flex-col md:inset-y-0 w-72">
                <div className="">
                    <Sidebar/>
                </div>
            </div>
            <main className="md:pl-72">
                {children}
            </main>
        </div>

)}
export default DashboardLayout;