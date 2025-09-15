import React from 'react'

const LoginForm = () => {
  return (
    <form className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="form-div">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                
                
                placeholder="Enter your email"
                required
            />
            </div>
            
            <div className="form-div">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                
                placeholder="Enter your password"
                required
            />
            </div>
            
            <button className="primary-button">
            Log In
            </button>
            
            <div className="text-center mt-6 w-full">
        </div>
    </form>
  )
}

export default LoginForm;
