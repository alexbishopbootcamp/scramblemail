import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { VERIFY_EMAIL } from '../graphql/mutations';

const VerifyEmail = () => {
  const { token } = useParams();
  const [verify, { data, loading, error }] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    if (token) {
      verify({ variables: { token } });
    }
  }, [token, verify]);

  return (
    <div>
      <h1>VerifyEmail Page. Token: <span>{token}</span></h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.verifyEmail && <p>Success! {data.verifyEmail.message}</p>}
      {data && data.errors && <p>Error: {data.errors[0].message}</p>}
    </div>
  );
};

export default VerifyEmail;
