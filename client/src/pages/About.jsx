import React from 'react';
import Header from '../components/common/Header';

const Landing = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col m-8 gap-16">
        <h1 className="font-bold text-theme-blue-300 text-center text-3xl pt-4">About ScrambleMail</h1>
        <div className="flex flex-col gap-3 bg-theme-white-200 rounded-xl p-8 shadow-md">

          <h1 className="font-bold text-theme-blue-300 text-2xl">What is ScrambleMail?</h1>
          <p>
            ScrambleMail is an innovative email proxy service designed to enhance your online
            privacy and security. It allows you to create unique, randomized email addresses
            when signing up for online services, all of which are forwarded to your real email
            address. By using ScrambleMail you can avoid exposing your real email address, 
            eliminating the risk of your real email address being exposed in a data breach and
            being a target for attacks.
          </p>
        </div>


        <div className="flex flex-col gap-3 bg-theme-white-200 rounded-xl p-8 shadow-md">
          <h1 className="font-bold text-theme-blue-300 text-2xl">How It Works</h1>
          <p>ScrambleMail enhances your online security in a few simple steps:</p>

          <div class="flex flex-col md:grid md:grid-cols-[auto,1fr] gap-4">
            <div class="font-semibold text-theme-blue-300 pr-4">Sign Up and Verification:</div>
            <div>Register with your real email address and confirm it through a verification link sent by ScrambleMail.</div>

            <div class="font-semibold text-theme-blue-300 pr-4">Browser Extension:</div>
            <div>Install the ScrambleMail browser extension for easy integration with web browsing.</div>

            <div class="font-semibold text-theme-blue-300 pr-4">One-Click Email Generation:</div>
            <div>Click the ScrambleMail button in any email field to generate a unique email address.</div>

            <div class="font-semibold text-theme-blue-300 pr-4">Automatic Email Forwarding:</div>
            <div>All done! Emails to ScrambleMail addresses are forwarded to your real inbox, protecting your privacy and reducing spam.</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-theme-white-200 rounded-xl p-8 shadow-md">
          <h1 className="font-bold text-theme-blue-300 text-2xl">Understanding Attacks</h1>
          <p>
          Credential stuffing and password spraying are two common cyber-attack techniques, 
          and understanding them is crucial for online safety.
          </p>
          <h2 className="pl-4 pt-4 font-semibold text-theme-blue-200 text-xl">Credential Stuffing</h2>
          <p className="pl-4">
          Credential stuffing is a type of attack where cybercriminals use stolen account 
          credentials (usernames and passwords) from one breach and try them on other online 
          platforms. This method exploits the common habit of using the same password across 
          multiple sites. If one site's security is breached, it potentially compromises 
          your security on all other sites where you've used the same credentials.
          </p>
          <h2 className="pl-4 font-semibold text-theme-blue-200 text-xl">Password Spraying</h2>
          <p className="pl-4 pb-4">
          Password spraying, on the other hand, takes a slightly different approach. Instead 
          of targeting a single user, attackers try a few commonly used passwords (like 
          'password123' or '123456') on a large number of usernames or email addresses. 
          The goal is to find the weakest link – someone using a weak, common password – 
          and gain unauthorized access.
          </p>
          <p>
          Both these attacks rely on the tendency of users to reuse passwords or use 
          easy-to-guess ones. By using ScrambleMail to create unique email addresses 
          for different sites, you significantly reduce the risk associated with these 
          types of attacks. With a different email for each site, it becomes much harder 
          for attackers to match stolen credentials to your other accounts, adding an 
          extra layer of security to your online presence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;