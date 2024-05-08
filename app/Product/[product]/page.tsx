import ProductDisplay from '@/app/components/ProductDisplay'
import Product from '@/app/utils/types'
import React from 'react'

type Props = {
    params: { product: string }
}

const page = ({ params }: Props) => {

    const id = params.product;


  return (
    <ProductDisplay id={id} />
  )
}

export default page