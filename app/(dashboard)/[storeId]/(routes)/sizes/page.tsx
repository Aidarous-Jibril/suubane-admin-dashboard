import React from 'react'
import { format } from "date-fns";

//local imports
import prismadb from '@/lib/prismadb'
import { SizeColumnTypes } from './components/columns'
import SizesListClient from './components/SizesListClient';

const SizesPage = async ({ params }: { params: { storeId: string }}) => {

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {  createdAt: 'desc' }
    })

    //format sizes 
    const formattedSizes: SizeColumnTypes[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    } ))
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <SizesListClient sizesData={formattedSizes} />
    </div>
  )
}

export default SizesPage