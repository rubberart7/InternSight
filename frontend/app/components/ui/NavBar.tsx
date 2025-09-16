"use client"

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import LogoutButton from "../auth/LogoutButton";

const Navbar = () => {
  const {accessToken, loading} = useAuth();

  if (loading) {
    return null;
  }


  return (
    <nav className="flex flex-row justify-between items-center bg-white rounded-full p-4 w-full px-10 max-w-[1200px] mx-auto">
      <Link href="/">
        <p className="text-2xl font-bold text-gradient">InternSight</p>
      </Link>
      { accessToken ?  (

        <div className="flex flex-row gap-4 items-center">
            <LogoutButton/>
            <Link href="/enter-resume" className="primary-button w-fit">
              Enter Resume
            </Link>
        </div>
        
      ) : (
        <div className="flex flex-row gap-4 items-center">
          <Link href="/login" className="secondary-button w-fit">
            Login
          </Link>
          <Link href="/signup" className="primary-button w-fit">
            Sign Up
          </Link>
        </div>
      )

      }
      
    </nav>
  );
};
export default Navbar;