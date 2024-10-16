
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import React from 'react'
import { FaTwitter } from "react-icons/fa";

function page() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-primary">Welcome to Content-Genie</CardTitle>
          <CardDescription className="text-center text-lg">
            Login to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Button variant="outline" className="h-12 gap-2" onClick={() => signIn("google",{callbackUrl:"http://localhost:3000/dashboard"})}>Login with Google
            <FcGoogle className="mr-2 h-5 w-5" />
          </Button>
            {/* <Button variant="outline" className="h-12 gap-2" onClick={() => signIn("twitter")}>Login with Twitter
            <FaTwitter className="mr-2 h-5 w-5 text-blue-400" />
            </Button> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default page