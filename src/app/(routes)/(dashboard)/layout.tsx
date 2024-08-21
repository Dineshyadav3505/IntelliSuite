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
            <div className="hidden h-full md:flex md:fixed z-10 mf:flex-col md:flex-col md:inset-y-0 w-24 lg:w-72">
                <div className="w-full">
                    <Sidebar/>
                </div>
            </div>
            <main className="md:pl-28 lg:pl-72 pt-20">
                {children}
            </main>
        </div>

)}
export default DashboardLayout;