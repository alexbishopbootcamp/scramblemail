import React from 'react';


const Info = () => {
  return (
    <>

      <content className="flex flex-col w-full items-center justify-center text-center
                          sm:flex-row">
        
          <div className="flex-grow
                          flex flex-col
                          items-start text-left justify-center w-full p-6">
              <h1 className="text-2xl font-bold text-theme-blue-300">
                <span className="text-theme-blue-300">Randomized email on every site</span>
              </h1>
              <p className="text-xl text-theme-blue-300">
                Sign up on every site with a unique email address to prevent tracking.
              </p>
          </div>

          <div className="flex-grow
                          flex
                          items-center justify-center text-center w-full p-6">
            <img className="h-48 w-80" src="secure-identity-2.jpg"></img>
          </div>
      </content>
      

      <content className="flex flex-col w-full items-center justify-center text-center
                          sm:flex-row-reverse">
        
          <div className="flex-grow
                          flex flex-col
                          items-start text-left justify-center w-full p-6">
              <h1 className="text-2xl font-bold text-theme-blue-300">
                <span className="text-theme-blue-300">Seamlessly works on any website</span>
              </h1>
              <p className="text-xl text-theme-blue-300">
              Automatically generate a unique email address for every site you visit.
              </p>
          </div>

          <div className="flex-grow
                          flex
                          items-center justify-center text-center w-full p-6">
            <img className="h-48 w-80" src="secure-identity-2.jpg"></img>
          </div>
      </content>

      <content className="flex flex-col w-full items-center justify-center text-center
                          sm:flex-row">
        
          <div className="flex-grow
                          flex flex-col
                          items-start text-left justify-center w-full p-6">
              <h1 className="text-2xl font-bold text-theme-blue-300">
                <span className="text-theme-blue-300">Pre-emptive protection against data breaches</span>
              </h1>
              <p className="text-xl text-theme-blue-300">
                Prevent common attacks including 
                <span className="text-theme-blue-200"> credential stuffing </span>
                and
                <span className="text-theme-blue-200"> password spraying.</span> 
              </p>
          </div>

          <div className="flex-grow
                          flex
                          items-center justify-center text-center w-full p-6">
            <img className="h-48 w-80" src="secure-identity-2.jpg"></img>
          </div>
      </content>

    </>
  );
};

export default Info;