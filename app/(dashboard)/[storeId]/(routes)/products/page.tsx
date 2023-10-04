import React from 'react'
import { format } from "date-fns";

//local imports
import prismadb from '@/lib/prismadb'
import { ProductColumnTypes } from './components/columns'
import { formatter } from '@/lib/utils';
import ProductsListClient from './components/ProductsListClient';


const ProductsPage = async ({ params }: { params: { storeId: string }}) => {

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            size: true,
            color: true,
            brand: true,
        },
        orderBy: {  createdAt: 'desc' }
    })
    
    //format billboard 
    const formattedProducts: ProductColumnTypes[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        // price: formatter.format(item.price.toNumber()),
        price: formatter.format(item.price),
        size: item.size.name,
        color: item.color.value,
        brand: item.brand.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    } ))

    console.log("products are", products)
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <ProductsListClient productsData={formattedProducts} />
    </div>
  )
}

export default ProductsPage