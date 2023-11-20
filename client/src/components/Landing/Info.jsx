import React from 'react';

const Card = ({ title, descriptions, image, flip }) => {
  return (
    <div className={`flex w-full items-center justify-center text-center
                        flex-col md:flex-row
                        ${flip ? 'md:flex-row-reverse' : ''}`}>
      <div className="flex-grow
                      flex flex-col
                      items-center text-left justify-center w-full px-10 py-6
                      ">
        <h1 className="text-3xl font-bold text-theme-blue-300">
          <span className="text-theme-blue-300">
            {title}
          </span>
        </h1>
        {descriptions.map((desc, index) => (
          <p key={index} className="text-2xl text-theme-blue-300 py-4">
            {desc}
          </p>
        ))}
      </div>

      <div className="flex-grow
                      flex
                      items-center justify-center text-center w-full p-6">
        <img className="w-11/12" src={image}></img>
      </div>
    </div>
  );
}


const Info = () => {
  return (
    <>
      <Card
        title="Randomized email on every site"
        descriptions={[
          "Sign up on every site with a random email address, unique to that site.",
          "Prevent your identity from being correlated across the internet.",
        ]}
        image="placeholder.jpg"
      />

      <Card
        title="Seamlessly works on any website"
        descriptions={[
          "Automatically fills in randomized email addresses on any website for you.",
          "Our browser extension makes it as easy as clicking a button.",
        ]}
        image="placeholder.jpg"
        flip={true}
      />

      <Card
        title="Pre-emptive protection against data breaches"
        descriptions={[
          <span>Prevent common attacks including
            <span className="text-theme-blue-200"> credential stuffing </span>
            and
            <span className="text-theme-blue-200"> password spraying.</span>
          </span>,
          "Easily dispose of compromised email addresses, and identify which sites have been breached.",
        ]}
        image="placeholder.jpg"
      />

    </>
  );
};

export default Info;