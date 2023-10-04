import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

//create a brand
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, subcategoryId } = body;

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Subcategory name is required", { status: 400 });
    }
    if (!subcategoryId) {
      return new NextResponse("SubcategoryId id is required", { status: 400 });
    }

    //Get store by id
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId
      }
    })
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

  //create a brand
    const brand = await prismadb.brand.create({
      data: {
        name,
        subcategoryId,
        storeId: params.storeId
      }
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log('[BRAND_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


//Get all brand
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const allSubcategories = await prismadb.subcategory.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(allSubcategories);
  } catch (error) {
    console.log('[SUBCATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};