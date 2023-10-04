import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';


// //create a proudct route
// export async function POST(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     const { userId } = auth();

//     const body = await req.json();
//     console.log(body)

//     const { name, price, sizeId, colorId, brandId, images, isFeatured, isArchived } = body;

//     if (!userId) {
//       return new NextResponse("Unauthenticated", { status: 403 });
//     }

//     if (!name) {
//       return new NextResponse("Name is required", { status: 400 });
//     }

//     if (!price) {
//       return new NextResponse("Price is required", { status: 400 });
//     }   
    
//     if (!sizeId) {
//       return new NextResponse("Size id is required", { status: 400 });
//     }
    
//     if (!colorId) {
//       return new NextResponse("Color id is required", { status: 400 });
//     }
    
//     if (!brandId) {
//       return new NextResponse("Brand id is required", { status: 400 });
//     }

//     if (!images || !images.length) {
//       return new NextResponse("Images are required", { status: 400 });
//     }

//     if (!params.storeId) {
//       return new NextResponse("Store id is required", { status: 400 });
//     }
    
//     //Get store by id
//     const storeByUserId = await prismadb.store.findFirst({
//       where: {
//         id: params.storeId,
//         userId
//       }
//     });
//     if (!storeByUserId) {
//       return new NextResponse("Unauthorized", { status: 405 });
//     }

//     //create product
//     const product = await prismadb.product.create({
//       data: {
//         name,
//         price,
//         sizeId,
//         colorId,
//         brandId,
//         isFeatured,
//         isArchived,
//         storeId: params.storeId,
//         image: {
//           createMany: {
//             data: [
//               ...images.map((image: { url: string }) => image),
//             ],
//           },
//         },
//       },
//     });
  
//     return NextResponse.json(product);
//   } catch (error) {
//     console.log('[PRODUCTS_POST]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };



export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();
console.log("Body data", body)
    const { name, price, brandId, colorId, sizeId, images, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!brandId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        brandId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const brandId = searchParams.get('brandId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    //get all products
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        brandId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        brand: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};