'use client'
import React, { useEffect, useState } from "react";

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
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("it worked");
        const theResponse = await response.json();
        console.log(theResponse);
        setUserFavourites(theResponse)
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

  return <div>

  <div>Favoritter</div>
  <div>{userFavourites.map((favourite, index) => (
    <div key={index}>{favourite}</div>
  ))}</div>
  </div>;
};

export default UserPage;
