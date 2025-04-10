import React, { useEffect, useState } from 'react';
import Sidenavbar from './Sidenavbar';
import axios from 'axios';

function Users() {

  const [users, setUsers] = useState([])

  const handleToggleStatus = (userId, currentStatus) => {
    axios.patch(`http://localhost:4000/users/${userId}`, { status: !currentStatus })
      .then(() => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, status: !currentStatus } : user
          )
        )
      })
      .catch(error => console.error('Error updating status:', error));
  }

  useEffect(() => {
    axios.get(`http://localhost:4000/users`)
      .then(res => setUsers(res.data))
      .catch(error => console.log('Something went wrong', error))
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidenavbar />

      <div className="flex-1 p-8">
        {/* Search bar */}
        <div className="flex items-center justify-between mb-8">
          <input
            type="search"
            placeholder="Search Users"
            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        {/* Table container */}
        <div className="flex justify-center w-full p-4">
          <div className="w-full max-w-5xl">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 text-gray-700 font-semibold bg-white p-4 rounded-md shadow mb-4">
              <div>Name</div>
              <div>Email</div>
              <div>Status</div>
              <div>Orders</div>
              <div>Action</div>
            </div>

            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 items-center bg-white p-4 rounded-md shadow mb-4 hover:shadow-md transition duration-300 space-y-2 md:space-y-0"
                >
                  {/* Name */}
                  <div className="text-center md:text-left">
                    <div className="md:hidden text-gray-500 text-sm">Name</div>
                    <div className="text-lg font-medium">{user.name}</div>
                  </div>

                  {/* Email */}
                  <div className="text-center md:text-left">
                    <div className="md:hidden text-gray-500 text-sm">Email</div>
                    <div className="text-gray-600">{user.email}</div>
                  </div>

                  {/* Status */}
                  <div className={`text-center md:text-left font-medium ${user.status ? 'text-green-600' : 'text-red-600'}`}>
                    <div className="md:hidden text-gray-500 text-sm">Status</div>
                    {user.status ? 'Active' : 'Blocked'}
                  </div>

                  {/* Orders */}
                  <div className="text-center md:text-left text-orange-600 hover:underline cursor-pointer">
                    <div className="md:hidden text-gray-500 text-sm">Orders</div>
                    View orders
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-center md:justify-start">
                    {user.isAdmin? null : <button
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      className="px-3 py-1 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition"
                    >
                      {user.status ? 'Block' : 'Activate'}
                    </button>}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-8">No users found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
