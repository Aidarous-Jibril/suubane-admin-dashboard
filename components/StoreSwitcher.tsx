"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useParams, useRouter } from "next/navigation"
import { Check, ChevronDown, PlusCircle, Store as StoreIcon} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

//local imports
import { Store } from "@prisma/client"
import { useStoreModal } from "@/hooks/useStoreModal"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

const StoreSwitcher = ({ className, items= [] }: StoreSwitcherProps) => {

    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    //state
    const [open, setOpen] = useState(false)

    const formattedStores = items.map((store) => ({
        label: store.name,
        currentId: store.id
      }));
    
      //find current store
      const currentStore = formattedStores.find((item) => item.currentId === params.storeId )
// console.log("Current ID", currentStore?.currentId)
      const storeSelectHandler = ( store: { label: string, currentId: string }) => {
        setOpen(false)
        router.push(`/${store.currentId}`)
      }


    return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild >
            <Button
                variant="outline"
                size="sm"
                role="combobox"
                aria-expanded={open}
                aria-label="Select store"
                className={cn("w-[200px] justify-between", className)}
            >
                <StoreIcon className="mr-4 w-4 h-4" />
                {currentStore?.label}
                <ChevronDown className="ml-auto 2-4 h-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent>
        <Command>
            <CommandInput placeholder="Search a store..." />
                <CommandList>
                    <CommandEmpty>No store found.</CommandEmpty>
                    <CommandGroup heading="Store">
                        {formattedStores.map((store) => (
                            
                            <CommandItem
                                key={store.currentId}
                                onSelect={() => storeSelectHandler(store)}
                                className="text-sm cursor-pointer space-y-4 "
                            >
                                <StoreIcon className="mr-4 w-4 h-4" />
                                {store.label}
                                <Check
                                    className={cn(
                                    "ml-auto h-4 w-4",
                                     currentStore?.currentId === store.currentId
                                        ? "opacity-100 "
                                        : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        )) }
                    </CommandGroup>
                </CommandList>
                <CommandSeparator />
                
                <CommandList>
                    <CommandGroup>
                    <CommandItem
                        onSelect={() => {
                            setOpen(false)
                            storeModal.onOpen()
                        }}
                    >
                        <PlusCircle className="mx-auto text-green-800 w-6 h-6 cursor-pointer" />
                    </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>

        </PopoverContent>

    </Popover>
  )
}

export default StoreSwitcher