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
            console.log(response.message);
        } else {
            console.log((await res.text()))
            const temp = await res.json();
            // console.log(temp)
            // console.log(temp.data)

            setProducts(temp.data);
            // console.log(temp.data)
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