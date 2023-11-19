import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { VERIFY_EMAIL } from '../graphql/mutations';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const VerifyEmail = () => {
  const { token } = useParams();
  const [verify, { data, loading, error }] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    if (token) {
      verify({ variables: { token } });
    }
  }, [token, verify]);


  // TODO: Combine common HTML with Auth.jsx
  return (
    <>
    <Header />
    <div className="flex grow justify-center items-center bg-theme-white-200">
      <div className="flex flex-col text-2xl gap-y-8 px-6 py-8 bg-theme-white-100 shadow-lg rounded-lg
                      items-center">

        {loading && <span className="text-md text-theme-blue-400">Loading...</span>}
        {error && <span className="text-md text-theme-blue-400">{error.message}</span>}
        {data && <span className="text-md text-theme-blue-400">{data.verifyEmail.message}</span>}
        {data && <span className="text-md text-theme-blue-400">You may now log in with your email and password</span>}

      </div>
    </div>
    <Footer />
    </>
  );
};

export default VerifyEmail;
