'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const ProductsContainer = () => {

    const [products, setProducts] = useState({products: []})

    const getProducts = async () => {
        const res = await fetch("http://127.0.0.1:5000/products", {
            method: "GET",
            headers: new Headers({ "Authorization": "f59cc9b7-26fc-4574-8ac0-85cff869b5af"},)
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