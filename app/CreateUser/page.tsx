'use client'
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import UserForm from "../components/UserForm";

const page = () => {
/*
    const FetchUser = async (email: string) => {
        const url = "http://127.0.0.1:5000/api/getuser";
        
        const data = {email};
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
            console.log(response.json())
          } else {
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }    
    }

  const CreateUser = async (password: string, email: string, name: string) => {
    const url = "http://127.0.0.1:5000/api/createuser";
    const id = uuidv4()
    
    const data = {id, password, email, name };
    console.log("i get called");
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
        FetchUser(email)

      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  CreateUser("abc123", "test@gmail.com", "Steven");
  console.log("f")
  */
  return <div className="w-full h-[90vh] flex items-center justify-center"><UserForm /></div>;
};

export default page;
