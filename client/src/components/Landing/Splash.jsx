import React from 'react';

const Splash = () => {
  return (
    <div className="flex flex-col relative w-full items-center justify-center text-center pt-10 h-[80vh]
                    bg-cover bg-center shadow-xl"
                    style={{ backgroundImage: `url('bionicman.jpg')` }}>
      <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-t from-black to-[#0000007f]">
        <div className="m-8 p-4 w-full max-w-md lg:max-w-lg z-10">
          <h1 className="text-4xl">
            <span className="text-theme-white-100 drop-shadow-glow-white-100">Protect your identity from </span>
            <span className="text-theme-blue-100 drop-shadow-glow-blue-100">data breaches </span>
            <span className="text-theme-white-100 drop-shadow-glow-white-100">and </span>
            <span className="text-theme-blue-100 drop-shadow-glow-blue-100">spam</span>
          </h1>
        </div>
      </div>
      {/* <img className="rounded-full w-64 absolute" src="secure-identity-2.jpg"></img> */}
    </div>
  );
};

export default Splash;