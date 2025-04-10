import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location=useLocation()
  const navigator = useNavigate()
  const Category=location.state?.value||""

  
  useEffect(() => {
    
    axios.get('http://localhost:4000/products')

      .then((response) => {
        if(Category)
        {
          setProducts(response.data.filter((products)=>products.category==Category))
        }
        else{
          setProducts(response.data); 
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });

     
  }, [Category]);

  if (loading) {
    return <div className="text-center text-xl">Loading products...</div>;
  }

  return (
<div className="container mx-auto p-6 ">
  

<div className="flex items-center justify-center px-4 py-2 border border-amber-300 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-600 ml-26 mb-6">
        <i className="fas fa-search text-amber-600 mr-2"></i>
        <input
          type="search"
          placeholder="Search..."
          className="outline-none text-gray-700"
        />
      </div>


  <div className="max-w-screen-lg mx-auto ">


    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden w-80"
          onClick={() => navigator(`/navigate/${product.id}`)}
        >
          <img
            src={product.image_url} 
            alt={product.name}
            className="w-full h-70 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-amber-600">${product.price}</span>
              <button className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition duration-300"
              onClick={() => navigator('/cart')} >
                View Product
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default ProductCard;
