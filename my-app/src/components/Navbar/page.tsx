"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaBars } from "react-icons/fa"; // For the mobile menu icon

function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar border-black bg-base-100 fixed top-0 left-0 w-full z-50">
      {/* Navbar start with logo */}
      <div className="navbar-start">
        <Link href={"/"} className="text-4xl sm:text-5xl m-2 p-3 font-bold flex ">
          ContentGenie
          <p className="rounded-full text-green-500">.</p>
        </Link>
      </div>

      {/* Navbar center with menu items (hidden on mobile, shown on lg and above) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="hover:bg-black hover:text-white font-medium text-lg" href={""}>
              Home
            </Link>
          </li>
          <li>
            <summary className="hover:bg-black hover:text-white font-medium text-lg">
              Docs
            </summary>
          </li>
          <li>
            <Link className="hover:bg-black hover:text-white font-medium text-lg" href={""}>
              About
            </Link>
          </li>
          <li>
            <Link className="hover:bg-black hover:text-white font-medium text-lg" href={""}>
              Blog
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu icon */}
      <div className="navbar-end lg:hidden">
        <button
          className="btn btn-ghost text-xl"
          onClick={toggleMobileMenu}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile menu (shown when the hamburger icon is clicked) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden">
          <ul className="menu p-4 flex flex-col space-y-4">
            <li>
              <Link href={""} className="hover:bg-black hover:text-white font-medium text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:bg-black hover:text-white font-medium text-lg">
                Docs
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:bg-black hover:text-white font-medium text-lg">
                About
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:bg-black hover:text-white font-medium text-lg">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Navbar end with Login button (always visible), and Schedule Demo (only on larger screens) */}
      <div className="navbar-end hidden lg:flex gap-3">
        {session && session.user?.name ? (
          <Link href={"/dashboard"} className="hover:bg-black hover:text-white text-md btn bg-white text-black">
            Get Started
          </Link>
        ) : (
          <Link href={"/Login"} className="text-black mr-7">
            Login
          </Link>
        )}

        <Link href={"https://yatharthportfolio.vercel.app/"} className="hover:bg-black text-md btn bg-black text-white">
          Contact Me
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
