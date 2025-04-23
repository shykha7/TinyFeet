import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ProductCard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const Category = location.state?.value || '';

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://db-d0r9.onrender.com/products');
        setAllProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products whenever searchTerm or category changes
  useEffect(() => {
    let filtered = allProducts;

    if (Category) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === Category.toLowerCase()
      );
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [allProducts, Category, searchTerm]);

  if (loading) {
    return <div className="text-center text-xl">Loading products...</div>;
  }

  return (
    <div className="container mx-auto ">
      {/* Pass searchTerm and setSearchTerm to Navbar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 p-12">No products found.</div>
      ) : (
        <div className="max-w-screen-lg mx-auto">
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 p-12">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden w-full max-w-[240px] mx-auto"
                onClick={() => navigate(`/navigate/${product.id}`)}
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-base font-semibold text-gray-800 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-base font-bold text-amber-600">${product.price}</span>
                    <button
                      className="bg-amber-600 text-white text-sm px-3 py-1 rounded hover:bg-amber-700 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/navigate/${product.id}`);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
