"use client";

//global imports
import CustomHeadings from '@/components/CustomHeadings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

//local imports
import { ProductColumnTypes, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiListingPage from '@/components/ApiListingPage';


interface ProductsListProps {
  productsData : ProductColumnTypes[]
}

const ProductsListClient = ({ productsData }: ProductsListProps) => {
  const params = useParams()
  const router = useRouter()
  
  return (
    <>
      <div className='flex items-center justify-between'>
        <CustomHeadings 
            title={`Products (${productsData?.length})`}
            description='Manage products for your store'
        />

        <Button onClick={() => router.push(`/${params.storeId}/products/create`)}>
          <Plus />Add New
        </Button>
        </div>
        <Separator />
        <DataTable searchTerm='name' columns={columns} data={productsData} />

        <CustomHeadings title='API' description='API calls for products'/>
        <Separator />
        <ApiListingPage entityName="products" entityId="productId" />
    </>
  )
}

export default ProductsListClient