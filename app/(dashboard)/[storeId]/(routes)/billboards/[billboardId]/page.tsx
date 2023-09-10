//import this to expose ID, when using findUnique method
//global imports
import { ObjectId } from 'mongodb';

//local imports
import prismadb from "@/lib/prismadb"
import { EditBillboardForm } from '@/components/billboards/EditBillboardForm';


const BillboardPage = async ({
    params
  }: {
    params: { billboardId: string }
  }) => {

    console.log("Single BillboardID", params.billboardId )
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: new ObjectId(params.billboardId).toString() 
        //  id:  params.billboardId? params.billboardId || new ObjectId().toHexString()
          // id: new ObjectId(params.billboardId).toHexString() 
      }
    })
    console.log("Billboard", billboard )

    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <EditBillboardForm initialData={billboard } />
        </div>
      </div>
    );
  }
  
export default BillboardPage;