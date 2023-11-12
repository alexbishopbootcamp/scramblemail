import React from 'react';
import { Link } from 'react-router-dom';


const Form = ({ type }) => {
  return (
    <form className="flex flex-col text-2xl gap-y-8 px-6 py-8 bg-theme-white-100 shadow-lg rounded-lg
                    items-center">
      <h1 className="w-96 text-left text-3xl font-bold text-theme-blue-300">
          {type === 'signup' ? 'Sign Up' : 'Log In'}
      </h1>
      <input className="w-full h-10" type="email"      placeholder="Email"    required />
      <input className="w-full h-10" type="password"  placeholder="Password" required />
      <button className="w-full py-2 px-4 rounded-lg text-white bg-theme-blue-300 hover:bg-theme-blue-400 hover:shadow-lg transition-all duration-50" type="submit">Submit</button>
      <div className="text-base text-theme-blue-300 underline">
        <Link to={type === 'signup' ? '/login' : '/signup'}>{type === 'signup' ? 'Already have an account?' : 'Don\'t have an account?'}</Link>
      </div>
    </form>
  );
};

export default Form;