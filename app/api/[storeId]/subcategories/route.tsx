import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

//create a sub category
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, categoryId } = body;

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Subcategory name is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("category id is required", { status: 400 });
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

    //create sub category
    const subcategory = await prismadb.subcategory.create({
      data: {
        name,
        categoryId,
        storeId: params.storeId
      }
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log('[SUBCATEGORY_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


//Get all sub categorires
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