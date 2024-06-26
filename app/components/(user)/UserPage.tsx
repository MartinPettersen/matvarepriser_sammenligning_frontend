'use client'
import React, { useEffect, useState } from "react";
import ProductCard from "../(home)/ProductCard";
import ProductDisplay from "../(product)/ProductDisplay";

type Props = {
  id: string
}

const UserPage = ({id}: Props) => {

  const [userFavourites, setUserFavourites] = useState([])

  const FetchUserFavourites = async (id: string) => {
    const url = "http://127.0.0.1:5000/api/getuserfavourites";

    const data = { id };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": process.env.NEXT_PUBLIC_MATVARE_PRISER_KEY!,

        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const theResponse = await response.json();
        setUserFavourites(theResponse)
        console.log(theResponse)
        return theResponse;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchUserFavourites(id)
  },[])

  return <div className="w-screen h-screen">

  <div>Favoritter</div>
  <div className="flex flex-col">{userFavourites.map((favourite, index) => (
    <ProductDisplay key={index} id={favourite[1]} />
  ))}</div>
  </div>;
};

export default UserPage;
