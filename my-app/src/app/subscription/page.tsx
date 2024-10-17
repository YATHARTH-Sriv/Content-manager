"use client"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

function page() {
  const {toast}=useToast()
  const handleclick=()=>{
    if(true){
        toast({
            title:"Thank For Using Content Genie",
            description:<p className=" text-white">Currently subscriptions are not supported.<br/> Contact <Link href={"/https://x.com/yatharth_sriv"}>Yatharth</Link></p>,
            variant:"destructive",
            className:"text-black"
          })
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center from-purple-100 to-pink-200">
      <div className="max-w-6xl w-full px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Select Best Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Starter Plan</CardTitle>
              <CardDescription>Perfect for individuals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$9.99/mo</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  Basic features
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  1 user
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  5GB storage
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleclick} className="w-full">Choose Plan</Button>
            </CardFooter>
          </Card>
          <Card className="w-full transform hover:scale-105 transition-transform duration-300 shadow-lg border-primary">
            <CardHeader>
              <CardTitle className="text-primary">Recommended Plan</CardTitle>
              <CardDescription>Best for small teams</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">$29.99/mo</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  Advanced features
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  Up to 5 users
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  50GB storage
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  Priority support
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleclick} className="w-full bg-primary hover:bg-primary/90">Choose Plan</Button>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Exclusive Plan</CardTitle>
              <CardDescription>For large enterprises</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$99.99/mo</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  All features
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  Unlimited users
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  1TB storage
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  24/7 dedicated support
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  Custom integrations
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleclick} className="w-full">Choose Plan</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default page