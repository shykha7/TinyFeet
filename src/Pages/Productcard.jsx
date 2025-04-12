import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

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
        const response = await axios.get('http://localhost:4000/products');
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
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === Category.toLowerCase()
      );
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [allProducts, Category, searchTerm]);

  if (loading) {
    return <div className="text-center text-xl">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar */}
      <div className="flex items-center justify-center px-4 py-2 border border-amber-300 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-600 ml-26 mb-6">
        <i className="fas fa-search text-amber-600 mr-2"></i>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none text-gray-700 w-full"
        />
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden w-80"
                onClick={() => navigate(`/navigate/${product.id}`)}
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
                    <button
                      className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/navigate/${product.id}`);
                      }}
                    >
                      View Product
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
