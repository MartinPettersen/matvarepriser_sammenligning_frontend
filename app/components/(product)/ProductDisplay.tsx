"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PriceDisplay from "./PriceDisplay";
import { Product } from "@/app/utils/types";
import { StarIcon as FavIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as FavIconOutline} from "@heroicons/react/24/outline";
import FavouriteIcon from "./FavouriteIcon";


type Props = {
  id: string;
};

const ProductDisplay = ({ id }: Props) => {
  const [product, setProduct] = useState<Product>();

  const getProduct = async () => {
    const res = await fetch(`http://127.0.0.1:5000/product/${id}`, {
      method: "GET",
      headers: new Headers({
        Authorization: "abbd229c-797b-43a7-bca6-d250e4973122",
      }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();

      setProduct(temp);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen gap-4">
      <div className="bg-white w-[40%] h-[50%] p-8 flex flex-col rounded-md gap-4">
        <div className="flex">
          <h1 className="font-bold text-3xl">{product?.name}</h1>
          <FavouriteIcon productId={product?.id}/>
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
      {product != undefined ? <PriceDisplay ean={product.ean} /> : null}
    </div>
  );
};

export default ProductDisplay;
