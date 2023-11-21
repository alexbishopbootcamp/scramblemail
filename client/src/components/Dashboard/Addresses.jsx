import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ADDRESSES } from '../../graphql/queries';
import { GENERATE_ADDRESS, DELETE_ADDRESS } from '../../graphql/mutations';
import AddressCard from './AddressCard';

const Addresses = () => {
  const { loading: addressesLoading, error: addressesError, data: addressesData, refetch } = useQuery(GET_ADDRESSES);
  const [generateAddress, { data: generateData, loading: generateLoading, error: generateError }] = useMutation(GENERATE_ADDRESS);
  const [deleteAddress, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_ADDRESS);

  const handleDelete = (addressId) => {
    deleteAddress({ variables: { id: addressId } })
      .then(response => {
        // Handle the successful deletion
        console.log('Address deleted:', response.data.deleteAddress);
        refetch();
      })
      .catch(error => {
        // Handle any errors
        console.error('Error deleting address:', error);
      });
  };

  return(
    <main className="grow flex flex-col items-center justify-center">
      {/* <button onClick={() => generateAddress()}>Generate Address</button> */}
      {addressesLoading && <span className="text-md text-theme-blue-400">Loading...</span>}
      {addressesError && <span className="text-md text-theme-blue-400">{addressesError.message}</span>}
      
      <div className="flex flex-col text-center w-full max-w-sm gap-3 mt-12">
        {addressesData && addressesData.getAddresses.length > 0 ? (
          addressesData.getAddresses.map((address) => (
            <AddressCard key={address.id} address={address} handleDelete={handleDelete} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-theme-blue-200 to-theme-blue-300 rounded-lg shadow-md">
            <h2 className="text-xl text-white font-bold mb-3">No Addresses Yet</h2>
            <p className="text-md text-white mb-4">Get started by installing our browser extension.</p>
            <a href="LINK_TO_EXTENSION" className="text-theme-blue-100 underline">Install Extension</a>
          </div>
        )}
      </div>
    </main>
  );
  
  
};

export default Addresses;