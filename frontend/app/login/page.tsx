import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import Navbar from '../components/ui/NavBar'
import Link from 'next/link'

const page = () => {
  return (
    
    <main className='bg-cover min-h-screen flex flex-col items-center'
    style={{ backgroundImage: "url('/images/bg-main.webp')" }}
    >
        <Navbar></Navbar>
        
        <section className="main-section py-16">
            <div className="page-heading">
                    <h1>Welcome</h1>
                    <h2>Log In to Continue Your Job Journey</h2>
            </div>

            <LoginForm></LoginForm>

             <p className="text-black-900 font-bold">
                Don't have an account?{' '}
                <Link href="/signup"className="text-blue-600 cursor-pointer hover:underline font-bold">
                    Sign Up
                </Link >
            </p>
        </section>
        
       
      
    </main>
  )
}

export default page;
