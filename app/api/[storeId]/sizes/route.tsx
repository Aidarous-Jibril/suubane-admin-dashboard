import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

//create a size
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Size Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Size value is required", { status: 400 });
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

    //create size
    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


//Get all sizes
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    //Get all sizes belong to specific store
    const allSizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(allSizes);
  } catch (error) {
    console.log('[SIZES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};