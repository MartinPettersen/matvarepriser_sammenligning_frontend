"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PriceDisplay from "./PriceDisplay";
import { Product } from "@/app/utils/types";
import FavouriteIcon from "./FavouriteIcon";
import AnalysisWindow from "./AnalysisWindow";
import ProductShowcase from "./ProductShowcase";

type Props = {
  id: string;
};

const ProductDisplay = ({ id }: Props) => {
  const [product, setProduct] = useState<Product>();

  const getProduct = async () => {
    const res = await fetch(`http://127.0.0.1:5000/product/${id}`, {
      method: "GET",
      headers: new Headers({
        Authorization: process.env.NEXT_PUBLIC_MATVARE_PRISER_KEY!,
      }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      console.log("the product");
      console.log(temp);
      setProduct(temp);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex items-center flex-col justify-center min-h-screen">
      
      {product != undefined ? <ProductShowcase product={product} /> : null}

          
    </div>
  );
};

export default ProductDisplay;
