import React, { useState } from "react";
import ProximityStores from "../components/ProximityStores";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start gap-4">
      <h1 className="font-bold text-3xl pt-10 text-white">
        Butikker i Nærheten av deg:
      </h1>
      <ProximityStores />
    </div>
  );
};

export default page;
