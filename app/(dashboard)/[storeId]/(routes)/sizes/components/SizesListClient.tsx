"use client";

//global imports
import CustomHeadings from '@/components/CustomHeadings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

//local imports
import { SizeColumnTypes, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiBillboardList from '@/components/ApiListingPage';


interface SizesListProps {
  sizesData : SizeColumnTypes[]
}

const SizesListClient = ({ sizesData }: SizesListProps) => {
  const params = useParams()
  const router = useRouter()

    return (
      <>
        <div className='flex items-center justify-between'>
          <CustomHeadings 
              title={`Sizes (${sizesData.length})`}
              description='Manage sizes for your store'
          />
          <Button onClick={() => router.push(`/${params.storeId}/sizes/create`)}>
            <Plus />
              Add New
          </Button>
          </div>
          <Separator />
          <DataTable searchTerm='name' columns={columns} data={sizesData} />

          <Separator />
          <ApiBillboardList entityName="sizes" entityId="sizeId" />
      </>
  )
}

export default SizesListClient