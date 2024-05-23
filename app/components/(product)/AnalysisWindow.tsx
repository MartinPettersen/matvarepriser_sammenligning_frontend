"use client";
import { StorePrice } from "@/app/utils/types";
import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import Chart from "./Chart";

type Props = {
  ean: string;
};

const PriceDisplay = ({ ean }: Props) => {
  const [storePrices, setStorePrices] = useState<StorePrice[]>([]);
  const [storePricesList, setStorePricesList] = useState<StorePrice[]>([]);

  const [average, setAverage] = useState(0);
  const [mean, setMean] = useState(0);

  const [filterTags, setFilterTags] = useState<string[]>();
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const [value, setValue] = useState(50);

  const [latitude, setLatitude] = useState<Number>();
  const [longitude, setLongitude] = useState<Number>();

  const getGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getStoreCloseBy(position.coords.latitude, position.coords.longitude);
      });
    }
  };

  const updateFilters = () => {
    const list = [];
    for (let i in storePricesList) {
      list.push(storePricesList[i].store);
    }
    setFilterTags(list);
  };

  const getStorePrices = async () => {
    const res = await fetch(`http://127.0.0.1:5000/product/price/${ean}`, {
      method: "GET",
      headers: new Headers({
        Authorization: "abbd229c-797b-43a7-bca6-d250e4973122",
      }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      console.log(temp.store_prices[0]["price_history"]);
      setAverage(temp.average);
      setMean(temp.mean);

      setStorePrices(temp.store_prices);
      setStorePricesList(temp.store_prices);
    }
  };

  // http://127.0.0.1:5000/product/price/7035620025037search_query=KIWI+Joker

  const getFilteredStores = async (tags = searchTags) => {
    let searchTerm = "";
    for (let i = 0; i < tags.length; i++) {
      if (i == 0) {
        searchTerm += tags[i];
      } else {
        searchTerm += `+${tags[i]}`;
      }
    }

    const res = await fetch(
      `http://127.0.0.1:5000/product/price/7035620025037search_query=${searchTerm}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "abbd229c-797b-43a7-bca6-d250e4973122",
        }),
      }
    );
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();

      setStorePrices(temp.store_prices);
      setAverage(temp.average);
      setMean(temp.mean);
    }
  };

  const getStoreCloseBy = async (lat: number, lng: number) => {
    const res = await fetch(
      `http://127.0.0.1:5000/stores/proximity/lat=${lat}&lng=${lng}&km=${
        value / 10
      }`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "abbd229c-797b-43a7-bca6-d250e4973122",
        }),
      }
    );
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();

      // setStorePrices(temp.store_prices);
      const matchList: string[] = [];
      for (let i = 0; i < temp["data"].length; i++) {
        const keyWords = temp["data"][i].name.split(" ");
        for (let j = 0; j < keyWords.length; j++) {
          if (
            filterTags?.includes(keyWords[j]) &&
            !matchList?.includes(keyWords[j])
          ) {
            matchList.push(keyWords[j]);
          }
        }
      }
      setSearchTags([...searchTags, ...matchList]);

      // setTimeout(getFilteredStores, 4000);
      getFilteredStores(matchList);
    }
  };

  const handleFilterChange = (kjede: string) => {
    if (searchTags?.includes(kjede)) {
      setSearchTags(searchTags.filter((item) => item !== kjede));
    } else {
      setSearchTags([...searchTags, kjede]);
    }
  };

  const handleChange = (radius: string) => {
    setValue(Number(radius));
  };

  useEffect(() => {
    updateFilters();
  }, [storePricesList]);

  useEffect(() => {}, [searchTags]);

  useEffect(() => {
    getStorePrices();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div className="bg-white rounded-md p-2 flex flex-col gap-2">
          <div
            className="bg-slate-700 p-1 rounded-md text-white flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 w-[12rem]"
            onClick={() => getFilteredStores()}
          >
            Filtrer på butikk kjede
          </div>
          <div
            className="bg-slate-700 p-1 rounded-md text-white flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 w-[15rem]"
            onClick={() => getGeolocation()}
          >
            Hvis bare i nærheten av meg
          </div>
          <div
            className="bg-slate-700 p-1 rounded-md text-white flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 w-[5rem]"
            onClick={() => getStorePrices()}
          >
            Hvis alle
          </div>
          <div className="flex gap-2">
            {filterTags?.map((tag, i) => (
              <div
                key={i}
                className={`${
                  searchTags.includes(tag) ? "text-slate-700" : "text-slate-300"
                } hover:text-slate-500 cursor-pointer`}
                onClick={() => handleFilterChange(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={value}
            className="range slider appearance-none bg-slate-600 cursor-pointer rounded-md"
            id="myRange"
            onChange={({ target: { value: radius } }) => handleChange(radius)}
          />

          {latitude ? (
            <div>{`Butikker innenfor ${value / 10}km radius`}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white font-semibold rounded-md h-full p-4">
            <div>Gjennomsnitts Pris: {average}</div>
            <div>Mean Pris: {mean}</div>
          </div>

          <div></div>
          {storePrices.length == 0 ? (
            <div className="bg-white p-2 rounded-md">
              Ingen Priser Tilgjengelige
            </div>
          ) : null}
        </div>
      </div>
      <div className="bg-slate-800 p-2 rounded-xl">
      {storePrices.length != 0 ?
        <Chart storePrices={storePrices}/>
        : null}
      </div>
    </div>
  );
};

export default PriceDisplay;
