"use client"

import { CldUploadWidget } from 'next-cloudinary';

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
    value: string[],
    disabled?: boolean,
    onChange: (value: string) => void,
    onRemove: (value: string) => void,
}

const ImageUpload = ({ value, disabled, onChange, onRemove }: ImageUploadProps) => {
    const [isMounted, setisMounted] = useState(false)

    useEffect(() => { 
       setisMounted(true)
    }, [])

    //upload image
    const uploadHandler = (result: any) => {
        onChange(result.info.secure_url);
      };
    

    if(!isMounted) return null

    return (
    <>
    {/* showing uploaded image */}
        <div className="mb-4 flex items-center gap-4">
            {value?.map((url) => (
            <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                <div className="z-10 absolute top-2 right-2">
                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                    <Trash className="h-4 w-4" />
                </Button>
                </div>
                <Image
                fill
                className="object-cover"
                alt="Image"
                src={url}
                />
            </div>
            ))}
        </div>
        {/* image uploading widget */}
        <CldUploadWidget onUpload={uploadHandler} uploadPreset="h4sfkqlp">
            {({ open }) => {
                const onClick = () => {
                    open();
                };
                return (
                <Button 
                    type="button" 
                    disabled={disabled}
                    variant="secondary"
                    onClick={onClick}
                    >
                        <ImagePlus className="w-4 h-4 mr-4 " />
                        Upload an Image
                </Button>
                );
            }}
        </CldUploadWidget>
     </>
  )
}

export default ImageUpload