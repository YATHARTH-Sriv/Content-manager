"use client"
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
// import { FaArrowRightLong } from 'react-icons/fa6'

function Navbar() {
  const { data: session } = useSession()
  return (
    <div className="navbar border-black bg-base-100 fixed top-0 left-0 w-full z-50">
      {/* Navbar start with logo */}
      <div className="navbar-start">
        <Link href={"/"} className="text-5xl m-2 p-3 font-bold flex text-gray-800">
        ContentGenie<p className=' rounded-full text-green-500'>.</p>
        </Link>
      </div>

      {/* Navbar center with menu items (hidden on mobile, shown on lg and above) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className='hover:bg-black hover:text-white font-medium text-xl' href={""}>
              Home
            </Link>
          </li>
          <li>
            <summary className='hover:bg-black hover:text-white font-medium text-xl'>
              Docs
            </summary>
          </li>
          <li>
            <Link className='hover:bg-black hover:text-white font-medium text-xl' href={""}>
              About
            </Link>
          </li>
          <li>
            <Link className='hover:bg-black hover:text-white font-medium text-xl' href={""}>
              Blog
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar end with Login button (always visible), and Schedule Demo (only on larger screens) */}
      <div className="navbar-end gap-3">
        {session && session.user?.name ? <Link href={"/dashboard"} className="hidden lg:flex hover:bg-black hover:text-white text-md btn bg-white text-black">Get Started</Link> : <Link href={"/Login"} className="text-black mr-7">Login</Link>}

        {/* Hidden on mobile, visible on large screens */}
        <Link href={"https://yatharthportfolio.vercel.app/"} className="hidden lg:flex hover:bg-black text-md btn bg-black text-white">
          Contact Me
          {/* <FaArrowRightLong className="m-1 hover:bg-black hover:text-white" /> */}
        </Link>
      </div>
    </div>
  )
}

export default Navbar