'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const ProductsContainer = () => {

    const [products, setProducts] = useState({products: []})

    const getProducts = async () => {
        const res = await fetch("http://127.0.0.1:5000/products", {
            method: "GET",
            headers: new Headers({ "Authorization": process.env.NEXT_PUBLIC_MATVARE_PRISER_KEY!},)
        });
        if (!res.ok) {
            console.log("fail")
            const response = await res.json();
            console.log(response)
        } else {
            const temp = await res.json();

            setProducts(temp);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

  return (
    <div className='flex flex-col gap-6'>
        {products?.products.map((product, i) => (
            <ProductCard key={i} product={product} />
        ))}
    </div>
  )
}

export default ProductsContainer