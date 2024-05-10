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
        className={`bg-white p-2 rounded-md flex relative z-10 justify-between`}
      >
        <Medalion index={index} />

        <div className="px-4">{storePrice.store} </div>
        <div>{storePrice.price} kr</div>
      </div>

    </>
  );
};

export default DisplayCard;
