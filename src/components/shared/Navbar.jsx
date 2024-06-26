"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-base-100">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              onClick={toggleDropdown}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-100">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        className="font-semibold hover:text-primary duration-300"
                        href={item.path}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Link href="/">
            <Image alt="logo" src="/assets/logo.svg" width={60} height={100} />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  className="font-semibold hover:text-primary duration-300"
                  href={item.path}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex space-x-3 items-center">
            <IoCartOutline className="text-2xl" />
            <IoSearchSharp className="text-2xl" />
            <a className="btn btn-outline btn-primary px-8">Appointment</a>
            <div>
              {session?.data?.user?.image ? (
                <Image
                  alt={session?.data?.user?.name || "User image"}
                  src={session?.data?.user?.image}
                  height={50}
                  width={50}
                  className="rounded-full border-2"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
              )}
            </div>
            {session?.status === "loading" && <h6>Loading...</h6>}
            {session?.status === "unauthenticated" && (
              <Link href="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            )}
            {session?.status === "authenticated" && (
              <button onClick={() => signOut()} className="btn btn-primary">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const navItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "MyBookings",
    path: "/my-bookings",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

export default Navbar;
