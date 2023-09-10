import useWindowOrigin from '@/hooks/useWindowOrigin'
import { useParams } from 'next/navigation'
import React from 'react'
import ApiAlert from './ApiAlert'

interface ApiListingPageProps {
    entityName: string,
    entityId: string,
}

const ApiListingPage = ({ entityName, entityId }: ApiListingPageProps) => {
  const params = useParams()
  const origin = useWindowOrigin()

  const baseUrl = `${origin}/api/${params.storeId}`
  return (
    <>
         <ApiAlert 
            title='GET' 
            description={`${baseUrl}/${entityName}`}
            variant='public'
          />
         <ApiAlert 
            title='GET' 
            description={`${baseUrl}/${entityName}/{${entityId}}`}
            variant='public'
          />
         <ApiAlert 
            title='CREATE' 
            description={`${baseUrl}/${entityName}`}
            variant='admin'
          />
         <ApiAlert 
            title='UDATE' 
            description={`${baseUrl}/${entityName}/{${entityId}}`}
            variant='admin'
          />
         <ApiAlert 
            title='DELETE' 
            description={`${baseUrl}/${entityName}/{${entityId}}`}
            variant='admin'
          />
    </>
  )
}

export default ApiListingPage