import React from 'react'
import { format } from "date-fns";

//local imports
import prismadb from '@/lib/prismadb'
import { ColorColumnTypes } from './components/columns'
import ColorsListClient from './components/ColorsListClient';

const ColorsPage = async ({ params }: { params: { storeId: string }}) => {

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {  createdAt: 'desc' }
    })

    //format colors 
    const formattedColors: ColorColumnTypes[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    } ))
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <ColorsListClient colorsData={formattedColors} />
    </div>
  )
}

export default ColorsPage