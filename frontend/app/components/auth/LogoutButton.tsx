"use client"

import React from 'react'

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";



const LogoutButton = () => {

    const { setAccessToken } = useAuth();
    const router = useRouter();

    const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleLogout = async () => {
        try {
        const res = await fetch(`${serverUrl}api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            setAccessToken(null);
            router.push("/");
        } else {
            console.error("Logout failed");
        }
        } catch (err) {
            console.error("Logout error:", err);
        }
    };
  return (
    <div>
        <button
        onClick={handleLogout}
        
        className="secondary-button w-fit"
        >
        
        Logout
        </button>
    </div>
  )
}

export default LogoutButton
