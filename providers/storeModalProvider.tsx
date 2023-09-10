"use client"

import React, { useEffect, useState } from 'react'

// local imports
import StoreModal from '@/components/modals/StoreModal'

export const StoreModalProvider = () => {
    const [isMounted, setisMounted] = useState(false)

    useEffect(() => { 
       setisMounted(true)
    }, [])

    if(!isMounted) return null

  return (
    <StoreModal />
  )
}

