import React, { useEffect, useState } from 'react'
import Sidenavbar from './Sidenavbar'
import axios from 'axios'

function Products() {

    const [products,setProducts]= useState([])

    useEffect(()=>{
      axios.get('http://localhost:4000/products')
      .then(res=>setProducts(res.data))

    },[])

  return <div className="flex min-h-screen">
  
  <Sidenavbar />

 
  <div className="flex-1 p-8">
  
    <div className="flex items-center justify-between mb-8">
      <input
        type="search"
        placeholder="Search Products"
        className="px-4 py-2 border border-gray-300 rounded-md w-1/3"
      />
      <button className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
        Add Product
      </button>
    </div>

   
    <div className="flex justify-center w-full p-4">
  <div className="w-full max-w-5xl">
    {/* Table Header */}
    <div className="hidden md:grid grid-cols-4 gap-4 text-gray-700 font-semibold bg-white p-4 rounded-md shadow mb-4">
      <div>Name</div>
      <div>Category</div>
      <div>Edit</div>
      <div>Delete</div>
    </div>

    {/* Table Rows */}
    {products.length > 0 ? (
      products.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 items-center bg-white p-4 rounded-md shadow mb-4 hover:shadow-md transition duration-300"
        >
          {/* Name */}
          <div className="text-lg font-medium">
            <span className="block md:hidden font-semibold text-gray-500">Name:</span>
            {product.name}
          </div>

          {/* Category */}
          <div className="text-gray-600">
            <span className="block md:hidden font-semibold text-gray-500">Category:</span>
            {product.category}
          </div>

          {/* Edit Button */}
          <div>
            <button className="text-green-500 hover:underline">Edit</button>
          </div>

          {/* Delete Button */}
          <div>
            <button className="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-500 mt-8">No products found.</div>
    )}
  </div>
</div>


  </div>
</div>

}

export default Products
