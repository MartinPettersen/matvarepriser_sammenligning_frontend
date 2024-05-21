'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const ProductsContainer = () => {

    const [products, setProducts] = useState({products: []})

    const getProducts = async () => {
        const res = await fetch("http://127.0.0.1:5000/products", {
            method: "GET",
            headers: new Headers({ "Authorization": "6f8ef514-2432-439b-a388-6c7142a631a2"},)
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