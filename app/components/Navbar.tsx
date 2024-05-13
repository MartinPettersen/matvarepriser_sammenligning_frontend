import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='min-w-screen h-20 sticky top-0 bg-slate-700 flex items-center justify-center font-bold text-3xl text-white gap-4'>
    <Link href="/" className=''>Matvare Priser</Link>
    <Link href="/Stores" className=''>Butikker nær meg</Link>
    
    </div>

  )
}

export default Navbar