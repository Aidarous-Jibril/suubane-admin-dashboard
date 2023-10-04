//import this to expose ID, when using findUnique method
//global imports
import { ObjectId } from 'mongodb';

//local imports
import prismadb from "@/lib/prismadb"
import EditSubCategoryForm from '@/components/subcategories/EditSubCategoryForm';
import EditBrandsForm from '@/components/brands/EditBrandsForm';


const EditCategoryPage = async ({
    params
  }: {
    params: { brandId: string, storeId: string }
  }) => {


  const brand = await prismadb.brand.findUnique({
    where: {
      id: new ObjectId(params.brandId ).toHexString()
    }
  });


    const subcategories = await prismadb.subcategory.findMany({
      where: {
        storeId: String(params.storeId) 
      }
    })
console.log("All subcategories", subcategories)
  console.log("Single Brand", brand)

    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <EditBrandsForm initialData={brand} subcategories={subcategories}  />
        </div>
      </div>
    );
  }
  
  export default EditCategoryPage;