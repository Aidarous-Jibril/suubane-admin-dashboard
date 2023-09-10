"use client";

//global imports
import CustomHeadings from '@/components/CustomHeadings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

//local imports
import { ColorColumnTypes, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiListingPage from '@/components/ApiListingPage';


interface ColorsListProps {
  colorsData : ColorColumnTypes[]
}

const ColorsListClient = ({ colorsData }: ColorsListProps) => {
  const params = useParams()
  const router = useRouter()

    return (
      <>
        <div className='flex items-center justify-between'>
          <CustomHeadings 
              title={`Colors (${colorsData.length})`}
              description='Manage colors for your store'
          />
          <Button onClick={() => router.push(`/${params.storeId}/colors/create`)}>
            <Plus />
              Add New
          </Button>
          </div>
          <Separator />
          <DataTable searchTerm='name' columns={columns} data={colorsData} />

          <Separator />
          <ApiListingPage entityName="colors" entityId="colorId" />
      </>
  )
}

export default ColorsListClient