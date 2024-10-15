"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { ObjectId } from "mongoose"
import axios from "axios"
import Image from "next/image"

interface userinfotype{
  name: string,
  email: string,
  profileimageurl: string,
  userId: string,
  credits: number,
  twitterlogin: boolean,
  mediumlogin: boolean,
  linkedinlogin: boolean,
  createdAt:Date,
  updatedAt:Date,
  __v:number,
  _id:ObjectId
}

function Profile() {
    const { data: session } = useSession()
    useEffect(() => {
        const fetchProfile = async () => {
          const res=await axios.get("/api/account-info")
          console.log(res.data)
          setuserinfo(res.data)

        }
        fetchProfile()
      },[session])
    const [userinfo, setuserinfo] = useState<userinfotype>()
    return (
    <div className="min-h-screen bg-gradient-to-b bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32">
            { userinfo?.profileimageurl && <Image src={userinfo?.profileimageurl} height={100} width={100} alt={""}/>}
          </div>
          <CardTitle className="text-2xl font-bold text-center">{userinfo?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-sm font-semibold">{userinfo?.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Credits Left</span>
            <Badge variant="secondary" className="text-sm font-semibold">
              {userinfo?.credits}
            </Badge>
          </div>
        </CardContent>
      </Card> 
    </div>
  )
}

export default Profile
