import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import Navbar from '../components/ui/NavBar'

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

             <p className="text-dark-200">
                Don't have an account?{' '}
                <span className="text-blue-600 cursor-pointer hover:underline font-semibold">
                Sign Up
                </span>
            </p>
        </section>
        
       
      
    </main>
  )
}

export default page
