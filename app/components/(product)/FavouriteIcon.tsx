'use client'
import React, { useEffect, useState } from "react";
import { StarIcon as FavIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as FavIconOutline } from "@heroicons/react/24/outline";

import { useSession } from "next-auth/react";

type Props = {
  productId?: string;
};

const FavouriteIcon = ({ productId }: Props) => {
  const { data: session } = useSession();

  const [isFavourite, setIsFavourite] = useState(false);

  const submitFavourite = async () => {
    const id = session?.user?.role;
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
    }
  };

  const deleteFavourite = async () => {
    const id = session?.user?.role;
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
    }
  };

  const CheckIfFavourite = async () => {
    const id = session?.user?.role;
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
    CheckIfFavourite();
  }, [isFavourite]);

  useEffect(() => {
    CheckIfFavourite();
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
