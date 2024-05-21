import React from "react";
import { StarIcon as FavIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as FavIconOutline } from "@heroicons/react/24/outline";

import { useSession } from "next-auth/react";

type Props = {
    productId?: string
}

const FavouriteIcon = ({productId}: Props) => {
  const { data: session } = useSession();

  const submitFavourite = async () => {
    const id = session?.user?.role
    const product_id = productId
    const res = await fetch("/api/Favourites/InsertFavourites", {
      method: "POST",
      body: JSON.stringify({ id, product_id }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
        console.log(res)
    }
  };

  return (
    <div>
      <FavIconOutline className="h-8 w-8 cursor-pointer" onClick={submitFavourite}/>
      {session?.user?.name}
    </div>
  );
};

export default FavouriteIcon;
