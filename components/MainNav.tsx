"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const MainNav = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {

    const params = useParams()
    const pathName = usePathname()

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Dashboard',
            active: pathName === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathName === `/${params.storeId}/settings`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathName === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Category',
            active: pathName === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/subcategories`,
            label: 'Subcat',
            active: pathName === `/${params.storeId}/subcategories`,
        },
        {
            href: `/${params.storeId}/brands`,
            label: 'Brand',
            active: pathName === `/${params.storeId}/brands`,
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Sizes',
            active: pathName === `/${params.storeId}/sizes`,
        },
        {
            href: `/${params.storeId}/colors`,
            label: 'Colors',
            active: pathName === `/${params.storeId}/colors`,
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            active: pathName === `/${params.storeId}/products`,
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Orders',
            active: pathName === `/${params.storeId}/orders`,
        },
    ]

  return (
    <nav className={cn("flex items-center space-x-4 ml-4 lg:space-x-6")}>
        {routes.map(r => (
            <Link 
                href={r.href}
                key={r.href}
                className={
                    cn('py-2 px-4 text-white bg-slate-800  rounded', 
                    r.active ? "hover:bg-slate-700"  : " text-muted-foreground"
                    )
                }
            >
                {r.label}
            </Link>
        ))}
    </nav>
  )
}

export default MainNav