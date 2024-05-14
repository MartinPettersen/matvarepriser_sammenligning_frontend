import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async () => {

  const session = await getServerSession(options)

  return (
    <div className="min-w-screen h-[10vh] sticky top-0 bg-slate-700 flex items-center justify-center font-bold text-3xl text-white gap-4">
      <Link href="/" className="">
        Matvare Priser
      </Link>
      <Link href="/Stores" className="">
        Butikker nær meg
      </Link>
      <Link href="/User" className="">
        Min Side
      </Link>
      <Link href="/CreateUser" className="">
        Opprett Bruker
      </Link>
      {session ? <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>: <Link href="/api/auth/signin">Login</Link>}
    </div>
  );
};

export default Navbar;
