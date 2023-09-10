import CreateProductForm from "@/components/products/CreateProductForm"
import prismadb from "@/lib/prismadb"

  
  
  export const CreateCategoryPage = async ({ params }: { params: { storeId: string }}) => {
      
    //fetch all categories to associate with the creation of category
    const categories = await prismadb.category.findMany({
        where: { storeId: params.storeId }
    })
    //fetch all billboarsizesds to associate with the creation of category
    const sizes = await prismadb.size.findMany({
        where: { storeId: params.storeId }
    })
    //fetch all colors to associate with the creation of category
    const colors = await prismadb.color.findMany({
        where: { storeId: params.storeId }
    })

    console.log("categories are", categories)
    console.log("sizes are", sizes)
    console.log("colors are", colors)
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <CreateProductForm
          categories={categories}
          sizes={sizes}
          colors={colors}
          // initialData={null} 
          />
    </div>
  )
}

export default CreateCategoryPage
  

