import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const UserDetail = () => {
  const { token } = useAuth();
  const router = useRouter();
  const { user } = router.query;
  const userData = user ? JSON.parse(user) : null;

  const handleRefresh = () => {
    router.push({
      pathname: `/user/${userData.id}`,
      query: { user: JSON.stringify(userData) }
    });
  };

  const handleDelete = async () => {
    try {
      await api.updateUser('delete', userData.email, token);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handlePromote = async () => {
    try {
      const response = await api.updateUser('promote', userData.email, token);
      if (response.message === 'user promoted') {
        userData.authority = 'admin'
        handleRefresh();
      }
    } catch (error) {
      console.error('Error promoting user:', error);
    }
  };

  const handleDemote = async () => {
    try {
      const response = await api.updateUser('demote', userData.email, token);
      if (response.message === 'user demoted') {
        userData.authority = 'user';
        handleRefresh();
      }
    } catch (error) {
      console.error('Error demoting user:', error);
    }
  };

  const handleBan = async () => {
    try {
      await api.updateUser('ban', userData.email, token);
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleBackClick = () => {
    router.push('/admin');
  };

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-5xl mx-auto py-6 px-4 flex">
        <div className="bg-white p-8 rounded shadow-md lg:w-4/5 mr-5">
          {/* User Information */}
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">User Information</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">User ID</label>
            <p className="text-lg font-semibold text-gray-800">{userData.id}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <p className="text-lg font-semibold text-blue-500 hover:underline">{userData.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <p className="text-lg font-semibold text-gray-800">{userData.username}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Authority</label>
            <p className={`text-lg font-semibold ${userData.authority === 'user' ? 'text-yellow-500' : 'text-green-500'}`}>{userData.authority}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Created At</label>
            <p className="text-lg font-semibold text-gray-800">{userData.created_at}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Updated At</label>
            <p className="text-lg font-semibold text-gray-800">{userData.updated_at}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-5 py-5 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Delete User
          </button>
          {userData.authority == 'user' && (
            <button
              onClick={handlePromote}
              className="bg-green-500 text-white px-5 py-5 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Promote User
            </button>
          )}
          {userData.authority != 'user' && (
            <button
              onClick={handleDemote}
              className="bg-yellow-500 text-white px-5 py-5 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Demote User
            </button>
          )}
          <button
            onClick={handleBan}
            className="bg-gray-500 text-white px-5 py-5 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Ban User
          </button>
          <button
            onClick={handleBackClick}
            className="bg-gray-400 text-white px-5 py-5 rounded-lg hover:bg-gray-500 transition duration-300 mt-4"
          >
            Back to Admin
          </button>
        </div>
      </div>
    </div>
  );

};

export default UserDetail;
