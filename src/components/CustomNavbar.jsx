"use client";
import UserContext from "../context/userContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";


const CustomNavbar = () => {
  const router = useRouter();
  const { user,setLogout,Logout } = useContext(UserContext);
  console.log(user, "User in navbar");


  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close menu when clicking on a menu item (for better UX)
  const closeMenu = () => setIsOpen(false);
  
  const logout = async() => {
    try{
      const response=await axios.post("/api/logout");
      console.log("Logout response:", response.data);
      if(response.data.success===true){
        console.log("User logged out successfully!");
        setLogout(Logout => !Logout);
        setIsOpen(false);
        router.push("/");
      
      }
    }
    catch(error){
      console.error("Error in logout:", error);
    }
  }
  useEffect(() => {}, [user]);



  return (
    <nav className="bg-slate-900 p-4 text-white relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">Blog Network</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-lg font-semibold hover:text-gray-400">Home</Link>
          <Link href="/add-task" className="text-lg font-semibold hover:text-gray-400">Add Blog</Link>
          <Link href="/show-task" className="text-lg font-semibold hover:text-gray-400">Your Blog</Link>
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <div className="flex gap-4">
              <div className="text-2xl font-semibold hover:text-gray-400">{user?.user?.name}</div>
              <button  className="text-xl font-semibold hover:text-gray-400" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/signup" className="text-lg font-semibold hover:text-gray-400">Sign Up</Link>
          )
          }

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-slate-900 flex flex-col items-center justify-center space-y-6 text-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden z-50`}
      >
        {/* Close button inside menu */}
        <button onClick={closeMenu} className="absolute top-4 right-6 text-3xl">
          <FiX />
        </button>

        {/* Menu Links */}
        <Link href="/" className="text-2xl font-semibold hover:text-gray-400" onClick={closeMenu}>Home</Link>
        <Link href="/add-task" className="text-2xl font-semibold hover:text-gray-400" onClick={closeMenu}>Add Task</Link>
        <Link href="/show-task" className="text-2xl font-semibold hover:text-gray-400" onClick={closeMenu}>Show Task</Link>
        {
          user ? (
            <Link href="/logout" className="text-2xl font-semibold hover:text-gray-400" onClick={logout}>
              Logout
            </Link>
          ) : (<Link href="/signup" className="text-2xl font-semibold hover:text-gray-400" onClick={closeMenu}>Sign Up</Link>)
        }

      </div>
    </nav>
  );
};

export default CustomNavbar;
