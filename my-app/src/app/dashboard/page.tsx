"use client"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  Package2,
  Search,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import Usermetrics from "@/components/user-metrics/page"
import ContentGenerator from "@/components/content/page"
import Profile from "@/components/profile/page"
import { signIn, signOut, useSession } from "next-auth/react"
import { FaTwitter } from "react-icons/fa";
import { SiHashnode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import axios from "axios"
import { ObjectId } from "mongoose"

interface userinfodata{
createdAt:string 
credits:number 
email: string
linkedinlogin: boolean
mediumlogin: boolean
name: string
profileimageurl: string
twitterlogin: boolean
updatedAt:string
userId: string
__v: Number
_id:ObjectId 
}


function Page() {
    const [currentPage, setCurrentPage] = useState('Dashboard')
    const [userinfo, setuserinfo] = useState<userinfodata>()
    const [alreadygeneratedcontent, setalreadygeneratedcontent] = useState<any []>()
    const [credits, setcredits] = useState(0)
    const {data:session}=useSession()
    console.log(session)
    const renderPage = () => {
        switch (currentPage) {
          case 'Dashboard':
            return <Dashboard />
          case 'usermetrics':
            return <Usermetrics />
          case 'Content':
            return <ContentGenerator />
          case 'Profile':
            return <Profile />
          default:
            return <Dashboard />
        }
      }
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get('/api/account-info')
        const contentres=await axios.get('/api/usercontent')
        const data = res.data
        const contentdata=contentres.data
        setuserinfo(data)
        setalreadygeneratedcontent(contentdata)
        setcredits(data.credits)
      }
      fetchData()
    },[session])
    

    const Dashboard=()=>(
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hashnode
              </CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
              <SiHashnode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Twitter
              </CardTitle>
              {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
              <FaTwitter className="h-4 w-4 text-muted-foreground"  />
            </CardHeader>
            {session?.userid ? <CardContent>
                <Button
                variant={currentPage === 'Content' ? 'default' : 'ghost'}
                className="text-2xl font-bold"
                onClick={() => setCurrentPage('Content')}
                 >
                  Upload Content
                </Button>
              <p className="text-xs text-muted-foreground">
                Last Time Uploaded: 2 days ago <button onClick={() => signOut({callbackUrl:"http://localhost:3000/dashboard"})}>Twitter</button>
              </p>
            </CardContent>: <CardContent>
              <div className="text-2xl font-bold">Connect Twitter</div>
              <p className="text-xs text-muted-foreground">
              <button onClick={() => signIn("twitter",{callbackUrl:"http://localhost:3000/dashboard"})}>Twitter</button>
              </p>
            </CardContent>}
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Linkedin</CardTitle>
              {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
              <FaLinkedin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Left</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            {userinfo && credits>0 ? <CardContent>
              <div className="text-3xl font-bold">{credits}</div>
              </CardContent>
              :
              <CardContent>
              <div className="text-3xl font-bold">No credits Left</div>
            </CardContent>}
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  Recent Content Generated By You.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                {alreadygeneratedcontent && 
                alreadygeneratedcontent.map((content:any)=>(
                  <TableRow key={content._id}>
                  <TableCell>
                       <div className="font-medium">{content.title}</div>
                       <div className="hidden text-sm text-muted-foreground md:inline">
                         {content.category}
                       </div>
                     </TableCell>
                     <TableCell className="text-right">{content.createdAt.slice(0,10)}</TableCell>
                   </TableRow>
                ))
                }
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Your Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                  <p className="text-sm text-muted-foreground">
                    will@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sofia.davis@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      )
  
    return (
      <div className="flex min-h-screen w-full flex-col bg-black">
            <header className="sticky top-0 flex h-16 items-center gap-4  bg-background px-4 md:px-6 bg-black text-white">
              <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                  <Button
                variant={currentPage === 'Dashboard' ? 'default' : 'ghost'}
                className="w-full justify-start "
                onClick={() => setCurrentPage('Dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                variant={currentPage === 'usermetrics' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentPage('usermetrics')}
                 >
                  User Metrics
                </Button>
                <Button
                variant={currentPage === 'Content' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentPage('Content')}
                 >
                  Content
                </Button>
                <Button
                variant={currentPage === 'Profile' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentPage('Profile')}
                 >
                  Profile
                </Button>
              </nav>
              <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                  </div>
                </form>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/Login' })}>Logout</button></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            {renderPage()}
      </div> 
       )
}

export default Page