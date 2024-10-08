
import { GridPattern } from "@/components/gridpattern/page"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"



function page() {
  return (
    <div className="relative bg-black w-full h-screen flex flex-col items-center justify-center">
    {/* Background GridPattern */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <GridPattern />
    </div>
    <div className="relative text-white z-10 flex items-center justify-center">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className=" grid gap-2">
        <Button className="w-full">Log in</Button>
        <p className=" px-4">Do not have an account <Link className=" text-orange-500" href={"/sign-in"}>Sign-in</Link></p>
      </CardFooter>
    </Card>
    </div>
    </div>
  )
}

export default page