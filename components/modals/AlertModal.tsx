import React, { useEffect, useState } from 'react'

import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

interface AlertModalProps {
    loading: boolean,
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void

}

const AlertModal = ({ loading, isOpen, onClose, onConfirm}: AlertModalProps) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) { return null}
    return (
    <Modal
        title="Are you sure?"
        description="If you delete, it would not be found again. Make sure you removed all belonged products to this category!"
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className='flex w-full justify-end items-center space-x-4'>
            <Button
                disabled={loading}
                onClick={onClose}
                variant="outline" 
            >
                Cancel
            </Button>
            <Button
                disabled={loading}
                onClick={onConfirm}
                variant="destructive" 
            >
                Continue
            </Button>
        </div>
    </Modal>
  )
}

export default AlertModal