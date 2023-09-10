//import this to expose ID, when using findUnique method
//global imports
import { ObjectId } from 'mongodb';

//local imports
import prismadb from "@/lib/prismadb"
import { EditColorForm } from '@/components/colors/EditColorForm';


const EditColorPage = async ({
    params
  }: {
    params: { colorId: string }
  }) => {

    console.log("Single ColorId", params.colorId )
    const singleColor = await prismadb.color.findUnique({
      where: {
        id: new ObjectId(params.colorId).toString() 
        //  id:  params.sizeId? params.sizeId || new ObjectId().toHexString()
          // id: new ObjectId(params.sizeId).toHexString() 
      }
    })
    console.log("Color", singleColor )

    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <EditColorForm initialData={singleColor } />
        </div>
      </div>
    );
  }
  
export default EditColorPage;