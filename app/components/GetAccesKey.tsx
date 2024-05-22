'use client'
import React, { useEffect, useState } from 'react'

const ProductsContainer = () => {

    const [products, setProducts] = useState()

    const getProducts = async () => {
        const res = await fetch("http://127.0.0.1:5000", {
            method: "GET",
            headers: new Headers({ "content-type": "application/json"},)
        });
        if (!res.ok) {
            const response = await res.json();
        } else {
            const temp = await res.json();

            setProducts(temp.data);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

  return (
    <div>ProductsContainer</div>
  )
}

export default ProductsContainer