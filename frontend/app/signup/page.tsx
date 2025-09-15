import React from 'react'
import SignupForm from '../components/auth/SignUpForm'
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
                    <h1>Find Your Next Role</h1>
                    <h2>Sign Up to Get Started</h2>
            </div>

            <SignupForm></SignupForm>

             <p className="text-black-900 font-bold">
                Already have an account?{' '}
                <Link href="/login"className="text-blue-600 cursor-pointer hover:underline font-bold">
                    Log In
                </Link >
            </p>
        </section>
        
       
      
    </main>
  )
}

export default page;
