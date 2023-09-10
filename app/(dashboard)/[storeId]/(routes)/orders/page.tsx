import React from 'react'
import { format } from "date-fns";

//local imports
import prismadb from '@/lib/prismadb'
import { OrderColumnTypes } from './components/columns'
import { formatter } from '@/lib/utils';
import OrdersListClient from './components/OrdersListClient';

const OrdersPage = async ({ params }: { params: { storeId: string }}) => {

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
              include: {
                product: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        });

    //format orders 
    const formattedOrders: OrderColumnTypes[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        products: item.orderItems.map((singleItem) => singleItem.product.name).join(", "),
        totalPrice: formatter.format(item.orderItems.reduce((total, item ) => total + Number(item.product.price), 0 )),
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        }));
      
  return (
    <div className='flex-1 space-y-4 p-8 pt-12'>
        <OrdersListClient ordersData={formattedOrders} />
    </div>
  )
}

export default OrdersPage