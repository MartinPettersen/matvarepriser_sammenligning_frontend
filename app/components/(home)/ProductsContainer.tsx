'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const ProductsContainer = () => {

    const [products, setProducts] = useState({products: []})

    const getProducts = async () => {
        const res = await fetch("http://127.0.0.1:5000/products", {
            method: "GET",
            headers: new Headers({ "Authorization": "e762f168-f0b6-4e0e-9fe4-622a6d3b3b0a"},)
        });
        if (!res.ok) {
            const response = await res.json();
            console.log(response.message);
        } else {
            // console.log((res))
            const temp = await res.json();
            //console.log(temp)
            //console.log(temp.data)

            setProducts(temp);
            console.log(temp)
            // console.log(temp.data)
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