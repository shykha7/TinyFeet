import React, { useEffect, useState } from 'react';
import Sidenavbar from './Sidenavbar';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
   
    axios.get('http://localhost:4000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log('Error fetching products', err));

    
    axios.get('http://localhost:4000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log('Error fetching users', err));
  }, []);

  const clothingCount = products.filter(p => p.category === 'clothing').length;
  const accessoriesCount = products.filter(p => p.category === 'kids accessories').length;
  const toysCount = products.filter(p => p.category === 'toy').length;

  const productData = [
    { name: 'Kids Clothing', value: clothingCount },
    { name: 'Accessories', value: accessoriesCount },
    { name: 'Toys', value: toysCount },
  ];

  const productColors = ['#FFB6C1', '#FFBB28', '#89CFF0']; 

  
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const blockedUsers = users.filter(u => u.status === 'blocked').length;

  const userData = [
    { name: 'Active Users', value: activeUsers },
    { name: 'Blocked Users', value: blockedUsers }
  ];

  const userColors = ['#34d399', '#f87171']; 

  return (
    <div className="flex min-h-screen">
    
      <Sidenavbar />

    
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-amber-600 mb-8">Dashboard Overview</h1>

       
        <div className="flex justify-center space-x-16">
        
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Products Overview</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={productColors[index % productColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* User Pie Chart */}
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Users Overview</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-user-${index}`} fill={userColors[index % userColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
