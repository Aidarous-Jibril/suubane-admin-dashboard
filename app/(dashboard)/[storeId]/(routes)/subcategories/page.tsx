import { format } from "date-fns";

//local imports
import prismadb from '@/lib/prismadb'
import { CategoryColumnTypes } from './components/columns'
import SubCategoriesListClient from './components/CategoriesListClient';

const SubCategoriesPage = async ({ params }: { params: { storeId: string }}) => {

    const subcategories = await prismadb.subcategory.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true
        },
        orderBy: {  createdAt: 'desc' }
    })
    
    //format billboard 
    const formattedSubCategories: CategoryColumnTypes[] = subcategories.map((item) => ({
        id: item.id,
        name: item.name,
        categoryName: item.category.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    } ))

    console.log("categories are", subcategories)
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <SubCategoriesListClient subcategoriesData={formattedSubCategories} />
    </div>
  )
}

export default SubCategoriesPage