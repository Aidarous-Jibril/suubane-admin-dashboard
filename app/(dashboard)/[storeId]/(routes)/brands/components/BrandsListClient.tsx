"use client";

//global imports
import CustomHeadings from '@/components/CustomHeadings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

//local imports
import { CategoryColumnTypes, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiListingPage from '@/components/ApiListingPage';


interface CategoriesListProps {
  brandsData : CategoryColumnTypes[]
}

const BrandsListClient = ({ brandsData }: CategoriesListProps) => {
  const params = useParams()
  const router = useRouter()
  
  return (
    <>
      <div className='flex items-center justify-between'>
        <CustomHeadings 
            title={`Brands (${brandsData.length})`}
            description='Manage brands for your store'
        />

        <Button onClick={() => router.push(`/${params.storeId}/brands/create`)}>
          <Plus />Add New
        </Button>
        </div>
        <Separator />
        <DataTable searchTerm='name' columns={columns} data={brandsData} />

        <CustomHeadings title='API' description='API calls for brands'/>
        <Separator />
        <ApiListingPage entityName="brands" entityId="brandId" />
    </>
  )
}

export default BrandsListClient