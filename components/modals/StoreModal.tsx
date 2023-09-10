"use client"

import { useState } from "react";

//Global imports
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from 'axios'
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

//local imports
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/useStoreModal";
import { toast } from "react-hot-toast";
 

// 1. Define your form Schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})


const StoreModal = () => {
    const storeModal =  useStoreModal()
    //state
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setLoading(true)

      const response = await axios.post("/api/stores", values)

      toast.success("Store created successfully")
      //ensure that store is created and the redirect user to dashboard
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
    console.log(values)
  }

  
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen} 
      onClose={storeModal.onClose}
    >
       <div className="py-2 px-4">
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Add store..." {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div  className="flex justify-end gap-2 py-2.5 text-center">
                        <Button type="submit" disabled={loading}>Submit</Button>
                        <Button type="submit" disabled={loading} onClick={storeModal.onClose} >Cancel</Button>
                    </div>
                </form>
            </Form>
       </div>
    </Modal>
  )
}

export default StoreModal
