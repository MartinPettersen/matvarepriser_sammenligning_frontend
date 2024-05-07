'use client'
import React, { useEffect, useState } from 'react'

const ProductsContainer = () => {

    const [products, setProducts] = useState()

    const getProducts = async () => {
        const res = await fetch("http://127.0.0.1:5000/products", {
            method: "GET",
            headers: new Headers({ "Authorization": "e6a3d48e-56fa-470b-ab6b-21c9827eab02"},)
        });
        if (!res.ok) {
            const response = await res.json();
            console.log(response.message);
        } else {
            // console.log((res))
            const temp = await res.json();
             console.log(temp)
            //console.log(temp.data)

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