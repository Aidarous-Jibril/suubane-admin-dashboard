"use client"

//Global imports
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "react-hot-toast";

//local imports
// import { Modal } from "@/components/ui/modal";
import CustomHeadings from "@/components/CustomHeadings"
import { Store } from "@prisma/client"
import AlertModal from '@/components/modals/AlertModal';
import ApiAlert from '@/components/ApiAlert';
import useWindowOrigin from '@/hooks/useWindowOrigin';
 

// 1. Define your form Schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})


interface SettingsFormProps {
  initialData: Store
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()
  const origin = useWindowOrigin()

   // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })
    // 2. Submit handler for post api request.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      setLoading(true)

      await axios.patch(`/api/stores/${params.storeId}`, values)

      router.refresh()
      toast.success("Store updated successfully")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
    // console.log(values)
    }

    //delete catergoty for store
  const onDelete = async () => {
    try {
      setLoading(true)

      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push("/")
      toast.success("Category deleted successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
    finally {
      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <>
      {/* Alert modal */}
      <AlertModal 
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex justify-between tems-center">
        <CustomHeadings title="Settings" description="Manage store" />
        <Button
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={() => setOpen(true)}
        >
                  <Trash className="w-4 h-4" />
          </Button>
      </div>
      <Separator />

      {/* Form */}
      <div className="py-2 px-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                <div className="grid grid-cols-3"> 
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                          <Input placeholder="Add store..." {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                </div>
              <Button type="submit" disabled={loading}>Save</Button>
            </form>
          </Form>
       </div>

       <Separator />
       <ApiAlert 
          title='NEXT_PUBLIC_API_URL' 
          description={`${origin}/api/${params.storeId}`}
          variant='public'
          />
    </>
  )
}

export default SettingsForm