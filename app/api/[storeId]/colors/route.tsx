import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

//create a color
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Color Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Color value is required", { status: 400 });
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

    //create color
    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


//Get all colors
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    //Get all colors belong to specific store
    const allColors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(allColors);
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};