"use client";

//global imports
import CustomHeadings from '@/components/CustomHeadings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

//local imports
import { BillboardColumnTypes, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiListingPage from '@/components/ApiListingPage';


interface BillboardsListProps {
  billboardsData : BillboardColumnTypes[]
}

const BillboardsListClient = ({ billboardsData }: BillboardsListProps) => {
  const params = useParams()
  const router = useRouter()

    return (
      <>
        <div className='flex items-center justify-between'>
          <CustomHeadings 
              title={`Billboards (${billboardsData.length})`}
              description='Manage billboards for your store'
          />
          <Button onClick={() => router.push(`/${params.storeId}/billboards/create`)}>
            <Plus />
              Add New
          </Button>
          </div>
          <Separator />
          <DataTable searchTerm='label' columns={columns} data={billboardsData} />

          <Separator />
          <ApiListingPage entityName="billboards" entityId="billboardId" />
      </>
  )
}

export default BillboardsListClient