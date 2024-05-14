import React from "react";

type Props = {
  index: number;
};

const Medalion = ({ index }: Props) => {
  return (
    <>
      {index == 1 ? (
        <div className="bg-yellow-400 rounded-full px-2 text-white font-bold">
          {index }
        </div>
      ) : null}
      {index == 2 ? (
        <div className="bg-slate-400 rounded-full px-2 text-white font-bold">
          {index}
        </div>
      ) : null}
      {index == 3 ? (
        <div className="bg-orange-700 rounded-full px-2 text-white font-bold">
          {index}
        </div>
      ) : null}
      {index > 3 ? (
        <div className="bg-red-600 rounded-full px-2 text-white font-bold">
          {index}
        </div>
      ) : null}
    </>
  );
};

export default Medalion;
