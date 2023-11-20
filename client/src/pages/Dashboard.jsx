import React from 'react';
import Nav from '../components/common/Nav';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ADDRESSES } from '../graphql/queries';
import { GENERATE_ADDRESS } from '../graphql/mutations';

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Addresses', path: '/dashboard/addresses' },
  { name: 'Profile', path: '/dashboard/profile' },
  { name: 'Settings', path: '/dashboard/settings' },
];

const Dashboard = () => {
  //const { data, loading, error } = useQuery(GET_ADDRESSES);
  const [generateAddress, { data, loading, error }] = useMutation(GENERATE_ADDRESS);

  console.log('test')
  
  return (
    <div className="flex flex-col-reverse max-h-screen overflow-scroll md:flex-row grow w-full h-full">

      <Nav navItems={navItems} flip={true} />

      {/* Email cards */}
      <main className="grow">
        <button onClick={() => generateAddress()}>Generate Address</button>
      </main>
    </div>
  );
};

export default Dashboard;