import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate(); 

  const handleNavigation = () => {
    navigate("/products");  
  };

  return (
    
    <div className="relative w-full">
      
      <img
        src="/hero-image.webp" 
        alt="Background"
        className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] object-cover"
      />

   
      <div className="absolute inset-0 bg-black opacity-50"></div> 

      <div className="absolute inset-0 flex items-center justify-center text-center z-10">
        <div className="text-white px-6">
          <p className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-amber-200" > 
           Discover our Fresh Styles<br/>
           for your little ones!
          </p>
         
         
          <button
            onClick={handleNavigation}  
            className="bg-amber-600 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-amber-700 transition duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
