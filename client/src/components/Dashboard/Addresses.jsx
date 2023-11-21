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
    <main className="grow">
      <button onClick={() => generateAddress()}>Generate Address</button>
      {addressesLoading && <span className="text-md text-theme-blue-400">Loading...</span>}
      {addressesError && <span className="text-md text-theme-blue-400">{addressesError.message}</span>}
      <div className="flex flex-col text-center gap-3 m-2">
        {addressesData && addressesData.getAddresses.map((address) => (
          <AddressCard key={address.id} address={address} handleDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
};

export default Addresses;