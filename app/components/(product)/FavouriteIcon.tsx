'use client'
import React, { useEffect, useState } from "react";
import { StarIcon as FavIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as FavIconOutline } from "@heroicons/react/24/outline";

import { useSession } from "next-auth/react";

type Props = {
  productId?: string;
};

const FavouriteIcon = ({ productId }: Props) => {

  const [userID, setUserId] = useState() 

  const fetchUserId = async () => {

    const email = session?.user?.email

    const res = await fetch("/api/Users/FetchUserId", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok){
        const response = await res.json()
        console.log(response.message)
    } else {
      const response = await res.json()

      setUserId(response.user.id)
      CheckIfFavourite(response.user.id);

    }

  }

  const { data: session } = useSession();

  const [isFavourite, setIsFavourite] = useState(false);

  const submitFavourite = async () => {
    const id = userID;
    const product_id = productId;
    const res = await fetch("/api/Favourites/InsertFavourites", {
      method: "POST",
      body: JSON.stringify({ id, product_id }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      setIsFavourite(true)
    }
  };

  const deleteFavourite = async () => {
    const id = userID;
    const product_id = productId;
    const res = await fetch("/api/Favourites/DeleteFavourites", {
      method: "POST",
      body: JSON.stringify({ id, product_id }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      setIsFavourite(false)
    }
  };

  const CheckIfFavourite = async (userId: string) => {
    const id = userId;
    const product_id = productId;
    const res = await fetch("/api/Favourites/CheckFavourites", {
      method: "POST",
      body: JSON.stringify({ id, product_id }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const response = await res.json();

      if (response.message == "False") {
        setIsFavourite(false)
      } else {
        setIsFavourite(true)
      }
    }
  };

  useEffect(() => {
    CheckIfFavourite(userID!);
  }, [isFavourite]);

  useEffect(() => {
    fetchUserId()
  }, [session]);

  return (
    <div className="text-yellow-400 hover:text-orange-300">
      {isFavourite ? (
        <FavIconSolid
          className="h-8 w-8 cursor-pointer"
          onClick={deleteFavourite}
        />
      ) : (
        <FavIconOutline
          className="h-8 w-8 cursor-pointer"
          onClick={submitFavourite}
        />
      )}
    </div>
  );
};

export default FavouriteIcon;
