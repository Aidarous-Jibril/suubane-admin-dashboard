"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { Brand,  Color, Product, Size } from "@prisma/client"
import ImageUpload from "../ImageUpload"
import { Checkbox } from "../ui/checkbox"


interface ProductFormProps {
  // initialData: Product & {
  //   images: Image[]
  // } | null
  // images: Image[]
  brands: Brand[] | null
  sizes: Size[] | null
  colors: Color[] | null
};

// form schema
const formSchema = z.object({
  name: z.string().min(1),
  // image: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  brandId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>


export default function CreateProductForm({  brands, sizes, colors}: ProductFormProps) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      name: '',
      images: [],
      price: 0,
      sizeId: '',
      colorId: '',
      brandId: '',
      isFeatured: false,
      isArchived: false,
    }
  });


  const onSubmit = async (data: ProductFormValues) => {
    try {
      await axios.post(`/api/${params.storeId}/products`, data);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Product created.");
    } catch (error: any) {
      toast.error('Something went wrong. Ensure that all requirements are met');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success('Products deleted.');
    } catch (error: any) {
      toast.error('Something went wrong.');
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
          <CustomHeadings title="Create Product ." description="Add a new product to a category" />
          </div>
          <Separator />
              
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Uppload images</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field?.value.map((image) => image.url)} 
                          disabled={loading} 
                          onChange={(url) => field.onChange([...field.value, { url }])}
                          onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <div className="md:grid md:grid-cols-4 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Featured 
                        </FormLabel>
                        <FormDescription>
                          Product appears on the home page{" "}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isArchived"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Archived 
                        </FormLabel>
                        <FormDescription>
                          Product not appears on the home page{" "}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <div className="mb-8">
                  <FormField
                    control={form.control}
                    name="sizeId"
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel>Size</FormLabel>
                      <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} placeholder="Select a size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sizes?.map((size) => (
                            <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="colorId"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors?.map((color) => (
                          <SelectItem key={color.id} value={color.id}>{color.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brandId"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands?.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-center">
                <Button disabled={loading} type="submit">Create</Button>
              </div>
            </form>
          </Form>
      </div>
    </div>
  )
}
