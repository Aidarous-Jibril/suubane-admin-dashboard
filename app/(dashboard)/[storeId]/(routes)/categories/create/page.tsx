import CreateCategoryForm from "@/components/categories/CreateCategoryForm"
import prismadb from "@/lib/prismadb"

  
  
  export const CreateCategoryPage = async ({ params }: { params: { storeId: string }}) => {
      
    //fetch all billboards to associate with the creation of category
    const billboards = await prismadb.billboard.findMany({
        where: { storeId: params.storeId }
    })

    console.log("categories are", billboards)
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <CreateCategoryForm initialData={billboards} />
    </div>
  )
}

export default CreateCategoryPage
  

