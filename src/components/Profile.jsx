import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Aparna Mishra',
    email: 'aparna@example.com',
    contact: '+919xxxxxxxxx',
  });

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold text-[#540B0E] mb-4">User Profile</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          value={profile.name}
          readOnly
          className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          value={profile.email}
          readOnly
          className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Phone Number</label>
        <input
          type="number"
          value={profile.contact}
          readOnly
          className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
      </div>
    </div>
  );
};

export default Profile;
