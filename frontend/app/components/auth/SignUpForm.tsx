"use client"

import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';


const SignupForm = () => {

    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [feedback, setFeedback] = useState<{ message: string; type: "Error" | "Success" | "Info" | "" }>({
            message: "",
            type: "",
    });
        
    const { accessToken, loading: authLoading, setAccessToken } = useAuth();


    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setFullName(event.target.value);
      setFeedback({ message: '', type: '' }); 
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
      setEmail(event.target.value);
      setFeedback({ message: '', type: '' });
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
      setPassword(event.target.value);
      setFeedback({ message: '', type: '' });
    }

    

    const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleSignUpClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (authLoading) {
            setFeedback({ message: "Checking login status, please wait...", type: "Info" });
            return;
        }
        if (accessToken) {
            setFeedback({ message: "You are already logged in.", type: "Info" });
            return; 
        }

        try {
            console.log("We will attempt to get a response from the backend.")
            const response = await fetch(`${serverUrl}api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ fullName, email, password }),
            });

            const result = await response.json();

            console.log("We were able to successfully process the backend.");

            if (!response.ok) {
                setFeedback({ message: result.message || "Login failed", type: "Error" });
                return;
            }

            if (result.accessToken) {
                setAccessToken(result.accessToken);
            }

            setFullName("");
            setEmail("");
            setPassword("");
            
            setFeedback({ message: "You have successfully signed up.", type: "Success" });
        } catch (error) {
            console.error("Signup Error:", error);
            setFeedback({ message: "Network error: Could not reach server", type: "Error" });
        }
    }
    return (
        <form className="bg-white rounded-2xl p-8 shadow-lg" action="post" onSubmit={handleSignUpClick}>
            <div className="form-div">
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    
                    value={fullName}
                    onChange={handleNameChange}
                    placeholder="Enter your full name"
                    required
                />
            </div>

            <div className="form-div">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                   
                    value={email}
                    onChange={handleEmailChange}
                    
                    placeholder="Enter your email"
                    required
                />
            </div>
                
            <div className="form-div">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    required
                />
            </div>

            {feedback.message && (
                <div className={`p-3 rounded-2xl text-center font-semibold inset-shadow bg-white/70 ${feedback.type === "Error" ? "border border-red-400 text-red-700" : "border border-green-400 text-green-700"}`}>
                    {feedback.message}
                </div>
            )}
            
            <button className="primary-button" >
                Sign Up
            </button>
                
        </form>
    )
}

export default SignupForm;
