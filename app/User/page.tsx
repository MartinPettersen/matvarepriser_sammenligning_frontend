import React from 'react'
import UserPage from '../components/(user)/UserPage'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await getServerSession(options)


    if(!session){
        redirect("/api/auth/signin?callbackUrl=/User")
    }

  return (
    <div className='w-full h-[90vh] flex items-center justify-center'>


        <UserPage id={session?.user?.role}/>
    </div>
  )
}

export default page