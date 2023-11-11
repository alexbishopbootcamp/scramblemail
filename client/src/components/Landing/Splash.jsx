import React from 'react';

const Splash = () => {
  return (
    <content>
      <div className="flex relative flex-col w-full items-center justify-center text-center">
        <div className="m-8 p-4 w-full max-w-md lg:max-w-lg">
          <h1 className="text-4xl text-theme-blue-300">
            <span className="text-theme-blue-300">Protect your identity from </span>
            <span className="text-theme-blue-200">data breaches </span>
            <span className="text-theme-blue-300">and </span>
            <span className="text-theme-blue-200">spam</span>
          </h1>
        </div>
        <img className="rounded-full w-64" src="secure-identity-2.jpg"></img>
      </div>
    </content>
  );
};

export default Splash;