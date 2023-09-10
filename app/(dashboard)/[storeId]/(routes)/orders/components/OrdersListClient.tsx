"use client";

//global imports
import CustomHeadings from '@/components/CustomHeadings'
import { Separator } from '@/components/ui/separator'

//local imports
import { OrderColumnTypes, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';


interface OrdersListProps {
  ordersData : OrderColumnTypes[]
}

const OrdersListClient = ({ ordersData }: OrdersListProps) => {

    return (
      <>
          <CustomHeadings 
              title={`Orders (${ordersData.length})`}
              description='Manage orders for your store'
          />
          
          <Separator />
          <DataTable searchTerm='product' columns={columns} data={ordersData} />
      </>
  )
}

export default OrdersListClient