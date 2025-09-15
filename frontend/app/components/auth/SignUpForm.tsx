import React from 'react';

const SignupForm = () => {
  return (
    <form className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="form-div">
            <label htmlFor="name">Full Name</label>
            <input
                type="name"
                id="name"
                name="name"
                
                
                placeholder="Enter your full name"
                required
            />
        </div>

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
            
            <button className="primary-button" >
            Sign Up
            </button>
            
    </form>
  )
}

export default SignupForm;
