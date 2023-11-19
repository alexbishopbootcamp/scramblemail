import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from '../../graphql/mutations';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { set } from 'mongoose';

const Form = ({ type }) => {
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  // Apollo mutation hook
  const [signupMutation, { data: signupData, loading: signupLoading, error: signupError }] = useMutation(REGISTER_USER);
  const [loginMutation, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (type === 'signup') {
      try {
        const { data } = await signupMutation({ variables: { primaryEmail, password } });
        setError('');
        setMessage(data.registerUser.message);
      } catch (err) {
        setError(err.message);
      }
    }
    if (type === 'login') {
      try {
        const { data } = await loginMutation({ variables: { primaryEmail, password } });
        login(data.loginUser.accesstoken);
        setMessage(data.loginUser.message);
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);
      } catch (err) {
        setError(err.message);
      }
    }
  };
  
  // TODO: Animated loading spinner

  return (
    <form className="flex flex-col text-2xl gap-y-8 px-6 py-8 bg-theme-white-100 shadow-lg rounded-lg
                    items-center"
          onSubmit={handleSubmit}>
      <h1 className="w-96 text-left text-3xl font-bold text-theme-blue-300">
          {type === 'signup' ? 'Sign Up' : 'Log In'}
      </h1>
      <input className="w-full h-10 p-1" type="email"     placeholder="Email"    minLength="5" maxLength="50" required
             value={primaryEmail} onChange={(e) => setPrimaryEmail(e.target.value)} />
      <input className="w-full h-10 p-1" type="password"  placeholder="Password" minLength="8" required
             value={password} onChange={(e) => setPassword(e.target.value)} />
      {message && <span className="text-sm text-theme-blue-400">{message}</span>}
      {error && <span className="text-sm text-red-700">{error}</span>}
      <button className="w-full py-2 px-4 rounded-lg text-white bg-theme-blue-300 hover:bg-theme-blue-400 hover:shadow-lg transition-all duration-50"
              type="submit" disabled={signupLoading || loginLoading} >
              {signupLoading || loginLoading ? '⏳' : (type === 'signup' ? 'Sign Up' : 'Log In')}
      </button>
      <div className="text-base text-theme-blue-300 underline">
        <Link to={type === 'signup' ? '/login' : '/signup'}>{type === 'signup' ? 'Already have an account?' : 'Don\'t have an account?'}</Link>
      </div>
    </form>
  );
};

export default Form;