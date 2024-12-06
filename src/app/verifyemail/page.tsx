'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

export default function VerifyEmailPage() {
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      console.log("Token being sent:",token);
      await axios.post('/api/users/verifyemail', { token })
      
        setVerified(true)
      
        setError(false)
      
    } catch (error: any) {
      setError(error.response ? error.response.data.error : 'An unexpected error occurred'); 
      console.error("Verification failed:", error);
    }
  }

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center
    min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2> You are verified.
            <Link href="/login">
            <a className="text-blue-500">Login</a>
            </Link>
          </h2>
        </div>
      )}

      {error && (
        <div>
          <h2>
            Not verified. Error {error}
          </h2>
        </div>
      )}
    </div>
  );
}
