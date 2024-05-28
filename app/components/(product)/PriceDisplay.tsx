"use client";
import { StorePrice } from "@/app/utils/types";
import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";

type Props = {
  storePrices: StorePrice[]
};

const PriceDisplay: React.FC<Props> = ({ storePrices }: Props) => {

  return (
    <div className="flex flex-col gap-4">
      
      <div className="flex flex-col gap-4">
        {storePrices?.map((storePrice: StorePrice, index: number) => (
          <DisplayCard key={index} storePrice={storePrice} index={index} />
        ))}

        <div></div>
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
