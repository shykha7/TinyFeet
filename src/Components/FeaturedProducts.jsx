import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


    function FeaturedProducts(){

      const [products,setProducts]=useState([])
      const navigateor=useNavigate()
     
      useEffect(()=>{
        axios
        .get('https://db-d0r9.onrender.com/products?_page=1&_limit=4')
        .then((respone)=>{setProducts(respone.data)})
        .catch((error)=>console.log("error found")
        )
      },[])

  return (
    <div className=" min-h-screen flex items-center justify-center p-6">
     
      <div className="container mx-auto">
     
        <h2 className="text-2xl lg:text-5xl font-semibold text-center mb-8 text-amber-600">
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
       {products.map((product)=>( <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden cursor-pointer" key={product.id} onClick={()=>(navigateor(`/navigate/${product.id}`))}>
         <img
           alt="Comfy Meal High Chair"
           src={product.image_url}
           className="w-full h-64 object-cover"
         />
         <div className="p-4 bg-transparent">
           <p className="text-lg font-semibold text-gray-800">{product.name}</p>
           <p className="text-xl font-bold text-amber-600">${product.price}</p>
         </div>
       </div>
       ))}
         
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
