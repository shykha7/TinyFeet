import React from 'react';
import { useNavigate } from 'react-router-dom';

function Category() {
  const navigator = useNavigate();
  
  return (
    <div className="bg-amber-50 p-6">
      <div className="text-5xl font-semibold text-center text-amber-600 mb-16">
        CATEGORY
      </div>

     
      <div className="flex flex-wrap justify-center gap-6"> 
      
       
        <div className="relative max-w-xs w-full" onClick={() => navigator(`/products`, { state: { value: "kids accessories" } })}>
          <img
            alt="Accessories"
            src="/accessories-Category.jpeg"
            className="w-full h-64 sm:h-80 md:h-96 lg:h-112 object-cover rounded-lg opacity-80 transition-opacity duration-300 ease-in-out"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-amber-200 text-2xl sm:text-3xl font-semibold rounded-lg">
            Kids Accessories
          </div>
        </div>

      
        <div className="relative max-w-xs w-full" onClick={() => navigator(`/products`, { state: { value: "clothing" } })}>
          <img
            alt="Clothing"
            src="/Clothing-Category.jpeg"
            className="w-full h-64 sm:h-80 md:h-96 lg:h-112 object-cover rounded-lg opacity-80 transition-opacity duration-300 ease-in-out"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-amber-200 text-2xl sm:text-3xl font-semibold rounded-lg ">
            Kids Clothing
          </div>
        </div>


        <div className="relative max-w-xs w-full" onClick={() => navigator(`/products`, { state: { value: "toy" } })}>
          <img
            alt="Toys"
            src="/Toys-Category.jpeg"
            className="w-full h-64 sm:h-80 md:h-96 lg:h-112 object-cover rounded-lg opacity-80 transition-opacity duration-300 ease-in-out"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-amber-200 text-2xl sm:text-3xl font-semibold rounded-lg">
            Toys
          </div>
        </div>

      </div>
    </div>
  );
}

export default Category;
