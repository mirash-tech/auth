'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Profilepage() {
  const router = useRouter();
  const [data,setdata] = useState("nothing")

  const getUserDetails = async () => {
    try {
      const response = await axios.get('/api/users/aboutme');
      console.log(response.data.data._id);
      setdata(response.data.data._id)
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
      toast.error('Failed to fetch user details')
    }
  }

  const logout = async () => {

    try {
      await axios.get('/api/users/logout')
      toast.success('Logged out successfully')
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      toast.error('Failed to log out')
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    
      <h1>profile page</h1>
      <hr />
      <h2>{data === "nothing" ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <hr />
      <button
      className='bg-blue-400 mt-4 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'     
      onClick={logout}>
        Logout
      </button>
      <button
      className='bg-green-400 mt-4 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'     
      onClick={getUserDetails}>
        Get User Details
      </button>
    </div>
  )
}
