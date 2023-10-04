//import this to expose ID, when using findUnique method
//global imports
import { ObjectId } from 'mongodb';

//local imports
import prismadb from "@/lib/prismadb"
import { EditProductForm } from '@/components/products/EditProductForm';


const EditCategoryPage = async ({
    params
  }: {
    params: { productId: string, storeId: string }
  }) => {


  const singleProduct = await prismadb.product.findUnique({
    where: {
      id: new ObjectId(params.productId).toString()
    },
    include: {
      images: true //to be checked
    }
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const brands = await prismadb.brand.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  console.log("Single Produc is", singleProduct)
  // console.log("Single Produc Imgs", singleProduct?.image[0])

    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <EditProductForm 
            singleProduct={singleProduct} 
            sizes={sizes} 
            colors={colors} 
            brands={brands}  
          />
        </div>
      </div>
    );
  }
  
  export default EditCategoryPage;