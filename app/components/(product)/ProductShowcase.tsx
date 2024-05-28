import React from 'react'
import FavouriteIcon from './FavouriteIcon'
import PriceDisplay from './PriceDisplay'
import AnalysisWindow from './AnalysisWindow'
import { Product } from '@/app/utils/types'
import Image from "next/image";

type Props = {
    product: Product
}

const ProductShowcase = ({product}: Props) => {
  return (
    <div className='flex gap-4 flex-col items-center justify-center p-4'>
          <div className="flex items-center justify-center  gap-4">
        <div className="bg-white w-[40%] h-[50%] p-8 flex flex-col rounded-md gap-4">
          <div className="flex">
            <h1 className="font-bold text-3xl">{product?.name}</h1>
            <FavouriteIcon productId={product?.id} />
          </div>
          {product != undefined ? (
            <Image
              src={product!["image"]}
              width={300}
              height={300}
              alt={`image of ${product!["name"]}`}
            />
          ) : null}
          {product?.description}
        </div>
      </div>
      <div className='flex gap-4'>

      {product != undefined ? <AnalysisWindow ean={product.ean} /> : null}
      </div>

    </div>
  )
}

export default ProductShowcase