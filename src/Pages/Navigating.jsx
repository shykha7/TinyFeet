import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ContextCreate } from '../App';
import Navbar from '../Components/Navbar';

function Navigating() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const { setConcat } = useContext(ContextCreate);
 

  const [product, setProduct] = useState();
  const [user, setUser] = useState();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    axios.get(`https://db-d0r9.onrender.com/products/${id}`)
      .then(res => setProduct(res.data));

    if (userId) {
      axios.get(`https://db-d0r9.onrender.com/users/${userId}`).then(res => {
        setUser(res.data);
        const exists = res.data.cart.some(item => item.id == id);
        setInCart(exists);
      });
    }
  }, [id, userId]);

  const addToCart = () => {
    if (!userId) return navigate('/login');

    if (!inCart) {
      const updatedCart = [...user.cart, product];
      axios.patch(`https://db-d0r9.onrender.com/users/${userId}`, { cart: updatedCart })
        .then(() => {
          setInCart(true);
          setConcat(prev => prev + 1);
          toast.success("Added to Cart");
        })
        .catch(() => toast.error('Failed to add to cart'));
    } else {
      navigate('/cart');
    }
  };

  const buyNow = () => {
    if (!userId) return navigate('/login');
    navigate(`/payment/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-white ">
      {/* Top fixed navbar */}
      <Navbar />

      {product && (
        <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
          
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-[450px] object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
            <h3 className="text-2xl text-amber-600 font-semibold mb-6">${product.price}</h3>

            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{product.description}</p>

            <div className="flex flex-wrap gap-4">
              <button
                className="bg-amber-500 text-white text-base px-6 py-3 rounded-lg hover:bg-amber-600 transition"
                onClick={addToCart}
              >
                {inCart ? "Go to Cart" : "Add to Cart"}
              </button>
              <button
                className="bg-gray-900 text-white text-base px-6 py-3 rounded-lg hover:bg-gray-700 transition"
                onClick={buyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigating;
