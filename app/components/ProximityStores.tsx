"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from 'next/image'

type OpeningHours = { 
  friday: string, 
  monday: string,
  saturday: string,
  sunday: string,
  thursday: string,
  tuesday: string,
  wednesday: string }

type Store = {
  group: string;
  name: string;
  website: string;
  logo: string;
  openingHours: OpeningHours
};

const weekDays: (keyof OpeningHours)[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday", 
  "saturday",
]

const ProximityStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [latitude, setLatitude] = useState<Number>();
  const [longitude, setLongitude] = useState<Number>();
  const [value, setValue] = useState(50)

  const d = new Date()

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getStoresCloseBy(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getStoresCloseBy(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [value]);

  const getStoresCloseBy = async (lat: number, lng: number) => {
    const res = await fetch(
      `http://127.0.0.1:5000/stores/proximity/lat=${lat}&lng=${lng}&km=${value/10}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "e762f168-f0b6-4e0e-9fe4-622a6d3b3b0a",
        }),
      }
    );
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();

      setStores(temp.data);
      console.log(`lat: ${latitude}`);
      console.log(temp.data.length);
    }
  };

  //  if (longitude != null) {
  //    getStoresCloseBy();
  //  }


  const handleChange = (radius: string) => {
    setValue(Number(radius))
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="range" min="1" max="100" value={value} className="range slider appearance-none bg-slate-600 cursor-pointer rounded-md" id="myRange" onChange={({target: {value: radius}}) => handleChange(radius)}/>
      <div className="text-white">Radius {value/10} km</div>
      <div className="flex flex-col gap-4">
        {stores?.map((store, index) => (
          <div key={index} className="bg-white rounded-lg py-4 flex flex-row items-center justify-start">
            <div className="p-4">
              <Image
                src={store.logo}
                width={50}
                height={50}
                alt="store logo"
              />
            </div>
            <div>
              <h2>{store.name}</h2>
              <Link href={store.website} className="text-blue-500">
                side: {store.website}
              </Link>
            <div>Åpningstider: {store.openingHours[weekDays[d.getDay()]]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProximityStores;
