"use client";
import { StorePrice } from "@/app/utils/types";
import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";

type Props = {
  ean: string;
};

const PriceDisplay = ({ ean }: Props) => {
  const [storePrices, setStorePrices] = useState<StorePrice[]>([]);
  const [storePricesList, setStorePricesList] = useState<StorePrice[]>([]);

  const [filterTags, setFilterTags] = useState<string[]>();


  const [latitude, setLatitude] = useState<Number>();
  const [longitude, setLongitude] = useState<Number>();

  useEffect(() => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }
    )
    }
  },[])  

  const updateFilters = () => {
    const list = []
    console.log("me gets caled")
    for (let i in storePricesList) {
      list.push(storePricesList[i].store)
    }
    setFilterTags(list)
    console.log(filterTags)
  }

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
      setStorePricesList(temp.store_prices);

      console.log(temp.store_prices);
    }
  };

  const getStoreCloseBy = async () => {
    const res = await fetch(`http://127.0.0.1:5000/stores/proximity/lat=${latitude}&lng=${longitude}`, {
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
      updateFilters()
  }, [storePricesList]);


  useEffect(() => {
    getStorePrices();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-md p-2 flex flex-col gap-2">
        <div className="bg-slate-700 p-1 rounded-md text-white flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 w-[12rem]">Filtrer på butikk kjede</div>
        <div className="bg-slate-700 p-1 rounded-md text-white flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 w-[15rem]">Hvis bare i nærheten av meg</div>
        <div className="bg-slate-700 p-1 rounded-md text-white flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 w-[5rem]">Hvis alle</div>
        <div className="flex gap-2">
        {filterTags?.map((tag, i) => (
          <div key={i} className="text-slate-300 hover:text-slate-500 cursor-pointer">{tag}</div>
        ))}

        </div>
        {location? <div>{`The lat is: ${latitude} and the long is: ${longitude} `}</div>: null}
      </div>
      <div className="flex flex-col gap-4">
        {storePrices?.map((storePrice: StorePrice, index: number) => (
          <DisplayCard key={index} storePrice={storePrice} index={index} />
        ))}
        {storePrices.length == 0 ? (
          <div className="bg-white p-2 rounded-md">
            Ingen Priser Tilgjengelige
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PriceDisplay;
