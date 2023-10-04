import React from 'react'
import { format, sub } from "date-fns";

//local imports
import prismadb from '@/lib/prismadb'
import { CategoryColumnTypes } from './components/columns'
import BrandsListClient from './components/BrandsListClient';

const BrandsPage = async ({ params }: { params: { storeId: string }}) => {

    const brands = await prismadb.brand.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            subcategory: true
        },
        orderBy: {  createdAt: 'desc' }
    })
    
    //format billboard 
    const formattedBrands: CategoryColumnTypes[] = brands.map((item) => ({
        id: item.id,
        name: item.name,
        subCategoryName: item.subcategory.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    } ))

    console.log("categories are", brands)
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <BrandsListClient brandsData={formattedBrands} />
    </div>
  )
}

export default BrandsPage