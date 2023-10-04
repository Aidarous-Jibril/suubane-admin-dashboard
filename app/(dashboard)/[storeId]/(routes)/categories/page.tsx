import React from 'react'
import { format } from "date-fns";

//local imports
import prismadb from '@/lib/prismadb'
import CategoriesListClient from './components/CategoriesListClient'
import { CategoryColumnTypes } from './components/columns'

const CategoriesPage = async ({ params }: { params: { storeId: string }}) => {

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            billboard: true
        },
        orderBy: {  createdAt: 'desc' }
    })
    
    //format billboard 
    const formattedCategories: CategoryColumnTypes[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    } ))

    // console.log("categories are", categories)
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <CategoriesListClient categoriesData={formattedCategories} />
    </div>
  )
}

export default CategoriesPage