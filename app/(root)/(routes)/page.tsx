"use client"

import { useEffect } from "react"

// local imports
import { useStoreModal } from "@/hooks/useStoreModal"
import StoreModal from "@/components/modals/StoreModal"


export default function Home() {
    
    const isOpen = useStoreModal((state) => state.isOpen) 
    const onOpen = useStoreModal((state) => state.onOpen) 
    
    useEffect(() => {
       if(!isOpen){
        onOpen()
       }
    }, [])

    return (
        <div className="m-4">
            <StoreModal />
        </div>
    )
  }
  