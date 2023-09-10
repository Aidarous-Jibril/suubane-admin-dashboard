import Navbar from "@/components/Navbar"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const setupLayout = async ({ children }: { children: React.ReactNode}) => {
    
    const { userId } = auth()
    if(!userId){
        redirect("/sign-in")
    }

    //find store whith uer id 
    const store = await prismadb.store.findFirst({
        where: { userId }
    })

    if(store) {
        redirect(`/${store.id}`)
    }
    return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default setupLayout