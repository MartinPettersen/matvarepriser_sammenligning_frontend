import { StorePrice } from "@/app/utils/types";
import React from "react";
import Medalion from "./Medalion";

type Props = {
    storePrice: StorePrice
    index: number
}

const DisplayCard = ({storePrice, index}: Props) => {
  
  return (
    <>
      {" "}
      <div
        className={`bg-white p-2 rounded-md flex relative z-[-1] justify-between`}
      >
        <Medalion index={Number(storePrice.ranking)} />

        <div className="px-4">{storePrice.store} </div>
        <div>{storePrice.price} kr</div>
        {Number(storePrice.ranking) != 1?

        <div className="text-red-500">{storePrice.price_increase} %</div>
      : <div className="text-white">-------</div> 
      }

      </div>

    </>
  );
};

export default DisplayCard;
