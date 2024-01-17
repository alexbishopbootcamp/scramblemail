import React from 'react';
import Header from '../components/common/Header';

const Landing = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col m-8 gap-16">
        <h1 className="font-bold text-theme-blue-300 text-center text-3xl pt-4">Contact</h1>
        <div className="flex flex-col gap-3 bg-theme-white-200 rounded-xl p-8 shadow-md">

          <p>
            For assistance with your account, please contact <a className="font-semibold text-theme-blue-200" href="mailto:support@scramble.email">support@scramble.email</a>
          </p>
          <p>
          For any other queries, please contact <a className="font-semibold text-theme-blue-200" href="mailto:contact@scramble.email">contact@scramble.email</a>
          </p>
          <p>
            Please contact us using your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;