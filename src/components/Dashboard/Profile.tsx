import React from "react";

const UserProfile = ({
  fullName,
  email,
  userName,
  phoneNumber,
  address,
  dateOfBirth,
  permanentAddress,
}) => {
  return (
    <div className='container mx-auto mt-10 px-4'>
      <div className='max-w-4xl mx-auto bg-white rounded-md shadow-md overflow-hidden'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>User Profile</h2>
          <div className='grid grid-cols-2 gap-x-4'>
            <div>
              <p className='text-gray-600 mb-2'>Full Name:</p>
              <p>{fullName}</p>
            </div>
            <div>
              <p className='text-gray-600 mb-2'>Email:</p>
              <p>{email}</p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-x-4 mt-4'>
            <div>
              <p className='text-gray-600 mb-2'>Username:</p>
              <p>{userName}</p>
            </div>
            <div>
              <p className='text-gray-600 mb-2'>Phone Number:</p>
              <p>{phoneNumber}</p>
            </div>
          </div>
          <div className='mt-4'>
            <p className='text-gray-600 mb-2'>Address:</p>
            <p>{address}</p>
          </div>
          <div className='mt-4'>
            <p className='text-gray-600 mb-2'>Date of Birth:</p>
            <p>{dateOfBirth}</p>
          </div>
          <div className='mt-4'>
            <p className='text-gray-600 mb-2'>Permanent Address:</p>
            <p>{permanentAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
