'use client'
import React, { useEffect, useState } from 'react'
import Product from '../utils/types';

type Props = {
    id: string
}

const ProductDisplay = ({id}: Props) => {

    const [product, setProduct] = useState<Product>()

    const getProduct = async () => {
        const res = await fetch(`http://127.0.0.1:5000/product/${id}`, {
            method: "GET",
            headers: new Headers({ "Authorization": "e762f168-f0b6-4e0e-9fe4-622a6d3b3b0a"},)
        });
        if (!res.ok) {
            const response = await res.json();
            console.log(response.message);
        } else {
            const temp = await res.json();

            setProduct(temp);
            console.log(temp)
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

  return (
    <div>{product?.name}</div>
  )
}

export default ProductDisplay