import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

//local imports
import prismadb from "@/lib/prismadb";

//Get single sub category
export async function GET(
    req: Request,
    { params }: { params: { subcategoryId: string } }
  ) {
    try {
      if (!params.subcategoryId) {
        return new NextResponse("Subcategory id is required", { status: 400 });
      }
  
      const subcategory = await prismadb.subcategory.findUnique({
        where: {
          id: params.subcategoryId
        }
      });
    
      return NextResponse.json(subcategory);
    } catch (error) {
      console.log('[SINGLE_SUBCATEGORY_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  
  //Delete sub category
  export async function DELETE(
    req: Request,
    { params }: { params: { subcategoryId: string, storeId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.subcategoryId) {
        return new NextResponse("Sub Category id is required", { status: 400 });
      }
  
      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
          userId,
        }
      });
  
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const subcategory = await prismadb.subcategory.delete({
        where: {
          id: params.subcategoryId,
        }
      });
    
      return NextResponse.json(subcategory);
    } catch (error) {
      console.log('[SINGLE_SUBCATEGORY_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  
//Update sub category
  export async function PATCH(
    req: Request,
    { params }: { params: { subcategoryId: string, storeId: string } }
  ) {
    try {   
      const { userId } = auth();
  
      const body = await req.json();
      
      const { name, categoryId } = body;
      
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!name) {
        return new NextResponse("Sub Category name is required", { status: 400 });
      }
  
      if (!categoryId) {
        return new NextResponse("Parent Category id is required", { status: 400 });
      }
  
      if (!params.subcategoryId) {
        return new NextResponse("Sub Category id is required", { status: 400 });
      }
  
      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
          userId,
        }
      });
  
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const subcategory = await prismadb.subcategory.update({
        where: {
          id: params.subcategoryId,
        },
        data: {
          name,
          categoryId
        }
      });
    
      return NextResponse.json(subcategory);
    } catch (error) {
      console.log('[SINGLE_SUBCATEGORY_PATCH]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };