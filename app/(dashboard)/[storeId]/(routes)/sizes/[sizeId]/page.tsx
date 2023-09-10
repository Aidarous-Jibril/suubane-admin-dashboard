//import this to expose ID, when using findUnique method
//global imports
import { ObjectId } from 'mongodb';

//local imports
import prismadb from "@/lib/prismadb"
import { EditSizeForm } from '@/components/sizes/EditSizeForm';


const EditSizePage = async ({
    params
  }: {
    params: { sizeId: string }
  }) => {

    console.log("Single SizeId", params.sizeId )
    const singleSize = await prismadb.size.findUnique({
      where: {
        id: new ObjectId(params.sizeId).toString() 
        //  id:  params.sizeId? params.sizeId || new ObjectId().toHexString()
          // id: new ObjectId(params.sizeId).toHexString() 
      }
    })
    console.log("size", singleSize )

    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <EditSizeForm initialData={singleSize } />
        </div>
      </div>
    );
  }
  
export default EditSizePage;