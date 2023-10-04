import CreateProductForm from "@/components/products/CreateProductForm"
import prismadb from "@/lib/prismadb"

  
  
  export const CreateCategoryPage = async ({ params }: { params: { storeId: string }}) => {
      
    //fetch all brands to associate with the creation of product
    const brands = await prismadb.brand.findMany({
        where: { storeId: params.storeId }
    })
    //fetch all sizea to associate with the creation of product
    const sizes = await prismadb.size.findMany({
        where: { storeId: params.storeId }
    })
    //fetch all colors to associate with the creation of product
    const colors = await prismadb.color.findMany({
        where: { storeId: params.storeId }
    })

    // console.log("brands are", brands)
    // console.log("sizes are", sizes)
    // console.log("colors are", colors)
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <CreateProductForm
          brands={brands}
          sizes={sizes}
          colors={colors}
          // initialData={null} 
          />
    </div>
  )
}

export default CreateCategoryPage
  

