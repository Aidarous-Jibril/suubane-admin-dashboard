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
  subcategoriesData : CategoryColumnTypes[]
}

const SubCategoriesListClient = ({ subcategoriesData }: CategoriesListProps) => {
  const params = useParams()
  const router = useRouter()
  
  return (
    <>
      <div className='flex items-center justify-between'>
        <CustomHeadings 
            title={`Subcategories (${subcategoriesData.length})`}
            description='Manage subcategories for your store'
        />

        <Button onClick={() => router.push(`/${params.storeId}/subcategories/create`)}>
          <Plus />Add New
        </Button>
        </div>
        <Separator />
        <DataTable searchTerm='name' columns={columns} data={subcategoriesData} />

        <CustomHeadings title='API' description='API calls for subcategories'/>
        <Separator />
        <ApiListingPage entityName="subcategories" entityId="subcategoryId" />
    </>
  )
}

export default SubCategoriesListClient