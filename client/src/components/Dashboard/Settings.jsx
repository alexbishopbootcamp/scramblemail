import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ADDRESSES } from '../../graphql/queries';
import { UPDATE_PRIMARY_ADDRESS, CHANGE_PASSWORD, DELETE_ACCOUNT } from '../../graphql/mutations';
import { GET_PROFILE } from '../../graphql/queries';
import AddressCard from './AddressCard';

const UserProfile = () => {
  // Not implemented yet
  const [updatePrimaryAddress, { data: updatePrimaryData, loading: updatePrimaryLoading, error: updatePrimaryError }] = useMutation(UPDATE_PRIMARY_ADDRESS);
  const [changePassword, { data: changePasswordData, loading: changePasswordLoading, error: changePasswordError }] = useMutation(CHANGE_PASSWORD);
  const [deleteAccount, { data: deleteAccountData, loading: deleteAccountLoading, error: deleteAccountError }] = useMutation(DELETE_ACCOUNT);
  const { loading: profileLoading, error: profileError, data: profileData } = useQuery(GET_PROFILE);

  if (profileLoading) return <p className="w-full text-center">Loading profile...</p>;
  if (profileError) return <p>Error loading profile: {profileError.message}</p>;

  const profile = profileData?.getProfile;

  return (
    <div className="flex flex-col items-center">

<div className="flex flex-col w-10/12 md:w-auto gap-3 bg-theme-white-200 rounded-xl p-8 shadow-md">
        <h1 className="font-bold  text-theme-blue-300 text-2xl">Settings</h1>

        <div class="flex flex-col md:grid md:grid-cols-[auto,1fr] gap-2 md:gap-4 pt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked />
          </label>
          <div>
          <div class="font-semibold text-theme-blue-300 md:pr-4 pt-2 md:p-0">Notify on data breach</div>
          <div>Get notified when a generated email address is found in a data breach</div>
          </div>

          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked />
          </label>
          <div>
          <div class="font-semibold text-theme-blue-300 md:pr-4 pt-2 md:p-0">Auto unsubscribe</div>
          <div>Automatically unsubscribe from mailing lists</div>
          </div>

        </div>
      </div>
    </div>

    
  );
};

export default UserProfile;