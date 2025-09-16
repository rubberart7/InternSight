"use client"

import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';



const LoginForm = () => {
	const [email, setEmail] = useState<string>("");
  	const [password, setPassword] = useState<string>("");
	const [feedback, setFeedback] = useState<{ message: string; type: "Error" | "Success" | "Info" | "" }>({
		message: "",
		type: "",
  	});
	
	const { accessToken, loading: authLoading, setAccessToken } = useAuth();
	const router = useRouter();

	const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
		setFeedback({ message: '', type: '' });
	}
	
	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value);
		setFeedback({ message: '', type: '' });
	}
    
	const handleLoginClick = async (event: React.FormEvent<HTMLFormElement>) => {
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
			const response = await fetch(`${serverUrl}api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ email, password }),
			});
			
			const result = await response.json();


			if (!response.ok) {
				setFeedback({ message: result.message || "Login failed", type: "Error" });
				return;
			}

			if (result.accessToken) {
				setAccessToken(result.accessToken);
			}

			
			setEmail("");
			setPassword("");
			router.push("/");
		} catch (error) {
			console.error("Login Error:", error);
			setFeedback({ message: "Network error: Could not reach server", type: "Error" });
		}
  	}


    

	return (
		<form className="bg-white rounded-2xl p-8 shadow-lg" onSubmit={handleLoginClick} action="post">
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
				
				<button className="primary-button" type="submit">
					Log In
				</button>
				
		</form>
	)
}

export default LoginForm;
