"use client";
import { StorePrice } from "@/app/utils/types";
import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";

type Props = {
  ean: string;
};

const PriceDisplay = ({ ean }: Props) => {
  const [storePrices, setStorePrices] = useState([]);

  const getStorePrices = async () => {
    const res = await fetch(`http://127.0.0.1:5000/product/price/${ean}`, {
      method: "GET",
      headers: new Headers({
        Authorization: "e762f168-f0b6-4e0e-9fe4-622a6d3b3b0a",
      }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();

      setStorePrices(temp.store_prices);
      console.log(temp.store_prices);
    }
  };

  useEffect(() => {
    getStorePrices();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {storePrices?.map((storePrice: StorePrice, index: number) => (

        <DisplayCard key={index} storePrice={storePrice} index={index}/>
        
      ))}
      {storePrices.length == 0? 
      <div className="bg-white p-2 rounded-md">Ingen Priser Tilgjengelige</div> 
    : null}
    </div>
  );
};

export default PriceDisplay;
