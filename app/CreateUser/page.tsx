'use client'
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import UserForm from "../components/UserForm";

const page = () => {

  return <div className="w-full h-[90vh] flex items-center justify-center"><UserForm /></div>;
};

export default page;
