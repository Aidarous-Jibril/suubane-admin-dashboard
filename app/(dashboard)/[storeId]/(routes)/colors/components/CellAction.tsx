"use client"

//global imports
import { useState } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"

//local imports 
import { ColorColumnTypes } from "./columns"
import AlertModal from "../../../../../../components/modals/AlertModal"
import { Button } from "../../../../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface CellActionsProps {
 data: ColorColumnTypes
}

const CellAction = ({ data }:CellActionsProps ) => {
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  //copy color Id
  const copyHandler = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("Color Id is copied")
  }
  //delete color
  const deleteHandler = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
      toast.success('Color deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Make sure you removed all products using this Color first.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

  return (
  <> 
    <AlertModal 
      loading={loading}
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={deleteHandler}
    />
      <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <Button className="w-8 h-8 p-0 ">
            <span className="sr-only">Open</span>
            <MoreHorizontal className="2-4 h-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => copyHandler(data.id)}>
            <Copy className="w-4 h-4 mr-2" />Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}>
            <Edit className="w-4 h-4 mr-2" />Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  </>
  )
}

export default CellAction