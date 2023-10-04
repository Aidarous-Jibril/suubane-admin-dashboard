import CreateSubCategoryForm from "@/components/subcategories/CreateSubCategoryForm"
import prismadb from "@/lib/prismadb"

  
  
  export const CreateSubCategoryPage = async ({ params }: { params: { storeId: string }}) => {
      
    //fetch all categories to associate with the creation of category
    const categories = await prismadb.category.findMany({
        where: { storeId: params.storeId }
    })

    console.log("categories are", categories)
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <CreateSubCategoryForm initialData={categories} />
    </div>
  )
}

export default CreateSubCategoryPage
  

