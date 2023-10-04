import CreateBrandForm from "@/components/brands/CreateBrandForm"
import prismadb from "@/lib/prismadb"

  
  
  export const CreateSubCategoryPage = async ({ params }: { params: { storeId: string }}) => {
      
    //fetch all brands to associate with the creation of sub category
    const subcategories = await prismadb.subcategory.findMany({
        where: { storeId: params.storeId }
    })

    console.log("sub categories are", subcategories)
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <CreateBrandForm initialData={subcategories} />
    </div>
  )
}

export default CreateSubCategoryPage
  

