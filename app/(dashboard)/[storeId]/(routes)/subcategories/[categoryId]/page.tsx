//import this to expose ID, when using findUnique method
//global imports
import { ObjectId } from 'mongodb';

//local imports
import prismadb from "@/lib/prismadb"
import EditSubCategoryForm from '@/components/subcategories/EditSubCategoryForm';


const EditCategoryPage = async ({
    params
  }: {
    params: { categoryId: string, storeId: string }
  }) => {


  const singleSubategory = await prismadb.subcategory.findUnique({
    where: {
      // id: String(params?.categoryId) || undefined
      id: new ObjectId(params.categoryId ).toHexString()
    }
  });


    const categories = await prismadb.category.findMany({
      where: {
        storeId: String(params.storeId) 
      }
    })
console.log("All categories", categories)
  console.log("Single Sub Category", singleSubategory)

    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <EditSubCategoryForm initialData={singleSubategory} categories={categories}  />
        </div>
      </div>
    );
  }
  
  export default EditCategoryPage;