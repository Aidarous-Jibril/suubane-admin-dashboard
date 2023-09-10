"use client"

// global imports
import { ObjectId } from 'mongodb';

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import AlertModal from "@/components/modals/AlertModal"
import CustomHeadings from "@/components/CustomHeadings"
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectContent, SelectValue } from "@radix-ui/react-select"
import { Billboard } from "@prisma/client"


interface CategoryFormProps {
  // initialData: Category | null;
  initialData: Billboard[] | null
};

// form schema
const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>


export default function CreateCategoryForm({initialData}: CategoryFormProps) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      name: '',
      billboardId: ''
    }
  });


  const onSubmit = async (data: CategoryFormValues) => {
    try {
      await axios.post(`/api/${params.storeId}/categories`, data);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category created.");
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${params.billboardId}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success('Category deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all products belonging this category first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AlertModal 
          isOpen={open} 
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
        <div className="flex items-center justify-between">
            <CustomHeadings title="Create Category ." description="Add a new category" />
              {/* <Button
                disabled={loading}
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
              >
                <Trash className="h-4 w-4" />
              </Button> */}
          </div>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <div className="md:grid md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billboardId"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Billboard</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {initialData?.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                  )}
                />
              </div>
              <Button disabled={loading} className="ml-auto" type="submit">
                Create
              </Button>
            </form>
          </Form>
      </div>
    </div>
  )
}
