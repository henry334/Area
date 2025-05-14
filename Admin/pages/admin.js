import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

// DEVELOPMENT
import mockUsers from '../utils/mockUsers'
//

const Admin = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const { token } = useAuth();

  useEffect(() => {
    // DEVELOPMENT
    if (token === 'dummy_token') {
      setUsers(mockUsers);
    }
    //
    else {
    // PRODUCTION
    const fetchUsers = async () => {
      try {
        const usersData = await api.getUsers(token);
        setUsers(usersData);
        
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    
    fetchUsers();
    
    }
  }, []);

  const sortData = (key, order) => {
    const sortedUsers = [...users].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
  
      if (order === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
    setUsers(sortedUsers);
  };

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    sortData(key, sortOrder);
  };

  const handleRowClick = (user) => {
    console.log('handle row click');
    console.log(user);
    router.push({
      pathname: `/user/${user.id}`,
      query: { user: JSON.stringify(user) }
    });
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold mb-6">Welcome to the Admin Panel!</h1>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} className="border border-gray-200 px-4 py-2 cursor-pointer">ID</th>
                <th onClick={() => handleSort('email')} className="border border-gray-200 px-4 py-2 cursor-pointer">Email</th>
                <th onClick={() => handleSort('username')} className="border border-gray-200 px-4 py-2 cursor-pointer">Username</th>
                <th onClick={() => handleSort('authority')} className="border border-gray-200 px-4 py-2 cursor-pointer">Authority</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} onClick={() => handleRowClick(user)} className="cursor-pointer">
                  <td className="border border-gray-200 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-200 px-4 py-2">{user.username}</td>
                  <td className="border border-gray-200 px-4 py-2">{user.authority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
