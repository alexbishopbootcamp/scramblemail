import React from 'react';

// Each stripe of the landing page. Flip param horizontally flips the image and text.
const Card = ({ title, descriptions, image, flip }) => {
  return (
    <div className={`flex flex-wrap w-full items-center justify-center text-center
                    md:flex-nowrap ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} 
                    my-6 md:my-12`}>
      <div className="flex-grow
                      flex flex-col
                      text-left items-center w-full px-6 py-6
                      md:w-1/2 md:px-10">
        <h1 className="w-10/12 text-3xl 2xl:text-4xl md:text-4xl font-bold text-theme-blue-300 mb-4">
          {title}
        </h1>
        {descriptions.map((desc, index) => (
          <p key={index} className="w-10/12 text-lg 2xl:text-2xl text-theme-blue-300 py-2 md:py-4">
            {desc}
          </p>
        ))}
      </div>

      <div className="flex-grow
                      flex
                      items-center justify-center text-center w-full p-6
                      md:w-1/2">
        <img className="w-11/12 xl:w-9/12 rounded" src={image} alt={title} />
      </div>
    </div>
  );
};


const Info = () => {
  return (
    <>
      <Card
        title="Randomized email on every site"
        descriptions={[
          "Sign up on every site with a random email address, unique to that site.",
          "Prevent your identity from being correlated across the internet.",
        ]}
        image="identity.jpg"
      />

      <Card
        title="Seamlessly works on any website"
        descriptions={[
          "Automatically fills in randomized email addresses on any website for you.",
          "Our browser extension makes it as easy as clicking a button.",
        ]}
        image="cyber.jpg"
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
        image="breach.jpg"
      />

    </>
  );
};

export default Info;