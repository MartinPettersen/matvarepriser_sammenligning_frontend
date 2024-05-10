import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <Link href="/" className='min-w-screen h-20 sticky top-0 bg-slate-700 flex items-center justify-center font-bold text-5xl text-white'>Matvare Priser</Link>
  )
}

export default Navbar