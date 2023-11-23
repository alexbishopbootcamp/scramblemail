import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ADDRESSES } from '../../graphql/queries';
import { UPDATE_PRIMARY_ADDRESS, CHANGE_PASSWORD, DELETE_ACCOUNT } from '../../graphql/mutations';
import { GET_PROFILE } from '../../graphql/queries';
import AddressCard from './AddressCard';

const UserProfile = () => {
  const [updatePrimaryAddress, { data: updatePrimaryData, loading: updatePrimaryLoading, error: updatePrimaryError }] = useMutation(UPDATE_PRIMARY_ADDRESS);
  const [changePassword, { data: changePasswordData, loading: changePasswordLoading, error: changePasswordError }] = useMutation(CHANGE_PASSWORD);
  const [deleteAccount, { data: deleteAccountData, loading: deleteAccountLoading, error: deleteAccountError }] = useMutation(DELETE_ACCOUNT);
  const { loading: profileLoading, error: profileError, data: profileData } = useQuery(GET_PROFILE);

  if (profileLoading) return <p>Loading profile...</p>;
  if (profileError) return <p>Error loading profile: {profileError.message}</p>;

  const profile = profileData?.getProfile;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-md flex flex-col w-full p-4 bg-azure rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <span className="text-md text-white font-bold">{profile?.primaryEmail}</span>
          <button className="text-md text-white font-bold">Edit</button>
        </div>
      </div>

      <div className="max-w-md flex flex-col w-full p-4 bg-azure rounded-lg mb-4">
        <button className="text-md text-white font-bold">Change Password</button>
      </div>

      <div className="max-w-md flex flex-col w-full p-4 bg-azure rounded-lg">
        <button className="text-md text-white font-bold">Delete Account</button>
      </div>
    </div>
  );
};

export default UserProfile;