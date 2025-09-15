import React from 'react';

const LoginForm = () => {

    const handleLoginClick = () => {

    }
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
            
            <button className="primary-button" type="submit">
            Log In
            </button>
            
    </form>
  )
}

export default LoginForm;
