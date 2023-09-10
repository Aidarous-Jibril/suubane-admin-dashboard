import React from 'react'
import { format } from "date-fns";

//local imports
import prismadb from '@/lib/prismadb'
import BillboardsListClient from './components/BillboardsListClient'
import { BillboardColumnTypes } from './components/columns'

const BillboardsPage = async ({ params }: { params: { storeId: string }}) => {

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {  createdAt: 'desc' }
    })

    //format billboard 
    const formattedBillboards: BillboardColumnTypes[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    } ))
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <BillboardsListClient billboardsData={formattedBillboards} />
    </div>
  )
}

export default BillboardsPage