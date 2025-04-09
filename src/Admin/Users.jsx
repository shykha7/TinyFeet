import React, { useEffect, useState } from 'react';
import Sidenavbar from './Sidenavbar';
import axios from 'axios';

function Users() {

  const [users,setUsers] = useState([])


  useEffect(()=>{
    axios.get(`http://localhost:4000/users`)
    .then(res=>setUsers(res.data))
    .catch(error=>console.log('Something went wrong'))
  },[])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidenavbar />

      <div className="flex-1 p-8">
        {/* Search bar */}
        <div className="flex items-center justify-between mb-8">
          <input
            type="search"
            placeholder="Search Users"
            className="px-4 py-2 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-amber-600"
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
                      className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 items-center bg-white p-4 rounded-md shadow mb-4 hover:shadow-md transition duration-300"
                    >
                      <div className="text-lg font-medium">{user.name}</div>
                      <div className="text-gray-600">{user.email}</div>
                      <div className="text-green-600">{user.status ? "Active" : "blocked"}</div>
                     
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 mt-8">No products found.</div>
                )}
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
