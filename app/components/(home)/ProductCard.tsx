import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";


type Product = {
  id: string;
  ean: string;
  name: string;
  description: string;
  category: object;
  brand: string;
  image: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  
  return (
    <Link href={`/Product/${product.id}`} className="bg-white p-4 rounded-md flex items-center justify-center gap-4">
      {product["name"]}
      <Image
        src={product["image"]}
        width={100}
        height={100}
        alt={`image of ${product["name"]}`}
      />
    </Link>
  );
};

export default ProductCard;
