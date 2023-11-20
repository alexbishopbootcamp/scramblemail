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

// export const GET_ADDRESSES = gql`
//   query getAddresses {
//     getAddresses {
//       id
//       email
//       createdAt
//       domain
//     }
//   }
// `;

const Dashboard = () => {
  const { loading: addressesLoading, error: addressesError, data: addressesData } = useQuery(GET_ADDRESSES);
  const [generateAddress, { data: generateData, loading: generateLoading, error: generateError }] = useMutation(GENERATE_ADDRESS);
  
  return (
    <div className="flex flex-col-reverse max-h-screen overflow-scroll md:flex-row grow w-full h-full">

      <Nav navItems={navItems} flip={true} />
      {/* Email cards */}
      <main className="grow">
        <button onClick={() => generateAddress()}>Generate Address</button>
        {addressesLoading && <span className="text-md text-theme-blue-400">Loading...</span>}
        {addressesError && <span className="text-md text-theme-blue-400">{addressesError.message}</span>}
        <div className="flex flex-col text-center">
          {addressesData && addressesData.getAddresses.map((address) => (
            <div key={address.id} className="m-1 p-2 bg-theme-white-200 rounded-lg">
              <span className="text-md text-black">{address.email}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;