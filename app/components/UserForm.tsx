"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const UserForm = () => {
  const id = uuidv4();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    id: id,
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");
    console.log("we send")
    console.log(formData)

    const res = await fetch("/api/Users/CreateUser", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok){
        const response = await res.json()
        setErrorMessage(response.message)
        console.log(response.message)
    } else {
        router.refresh()
        router.push("/")
    }


  };

  return <form
  onSubmit={handleSubmit} method="post" className="flex flex-col gap-2 bg-slate-600 p-4 text-white"
  >
    <h1>Opprett ny bruker</h1>
    <label>Navn</label>
    <input id="name" name="name" type="text" onChange={handleChange} required={true} value={formData.name} className="text-slate-600"/>
    <label>Epost</label>
    <input id="email" name="email" type="text" onChange={handleChange} required={true} value={formData.email} className="text-slate-600"/>
    <label>Passord</label>
    <input id="password" name="password" type="password" onChange={handleChange} required={true} value={formData.password} className="text-slate-600"/>
    <input type="submit" value="Opprett Bruker" className="bg-red-400" />
  </form>;
};

export default UserForm;
