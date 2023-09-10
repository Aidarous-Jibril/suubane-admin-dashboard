//import this to expose ID, when using findUnique method
//global imports
import { ObjectId } from 'mongodb';

//local imports
import prismadb from "@/lib/prismadb"
// import { CategoryForm } from "./components/CategoryForm";
import { EditCategoryForm } from '@/components/categories/EditCategoryForm';


const EditCategoryPage = async ({
    params
  }: {
    params: { categoryId: string, storeId: string }
  }) => {


  const singleCategory = await prismadb.category.findUnique({
    where: {
      // id: String(params?.categoryId) || undefined
      id: new ObjectId(params.categoryId ).toHexString()
    }
  });


    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: String(params.storeId) 
      }
    })
console.log("All Billboards", billboards)
  console.log("Single Category", singleCategory)

    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <EditCategoryForm singleCategory={singleCategory} allBillboards={billboards}  />
        </div>
      </div>
    );
  }
  
  export default EditCategoryPage;