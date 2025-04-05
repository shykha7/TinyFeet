import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function Navigating() {
  const { id } = useParams();
  const [product, setProducts] = useState();
  const [user,setUser]=useState()
  const userId= localStorage.getItem("id")
  const navigate = useNavigate()
  const [count,setCount]=useState(0)
  const [found,setfound]=useState([])



  useEffect(() => {
    axios.get(`http://localhost:4000/products/${id}`)
      .then((response) => setProducts(response.data));

    userId&&axios.get(`http://localhost:4000/users/${userId}`)
    .then((respone)=>{setUser(respone.data)
      setfound(respone.data.cart.filter((cartproduct)=>cartproduct.id==id))
      
    })
  },[id,userId,count]);


  const addtocart=()=>{
    if(!userId){
      navigate('/login')
    }
    if(found.length==0)
    {
      const updatedcart=[...user.cart,product]
     
      axios.patch(`http://localhost:4000/users/${userId}`,
      {
      cart:updatedcart
      })
      .then(()=>setCount(count+1), toast.success("Added to Cart"))
      .catch(()=>{toast.error('Error adding product to the cart')})
    }
    else{
      navigate("/cart")
    }
  }
  

  const buyNow=()=>{
    if(!userId){
      navigate('/login')
    }else{
      navigate(`/payment/${product.id}`)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-amber-50">
     
      {product&&
        <div
          key={product.id}
          className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-xl flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 ">
          
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain"
            /> 
          </div>

          
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-amber-600">{product.name}</h2>
            <h3 className="text-xl text-gray-600 mb-4">
              ${product.price} 
            </h3>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex space-x-4">
              <button className="bg-amber-500 text-white py-2 px-6 rounded-lg hover:bg-amber-600 transition duration-300" 
              onClick={addtocart}>
                {found.length!=0?"Go to Cart":"Add to Cart"}
              </button>
              <button className="bg-amber-500 text-white py-2 px-6 rounded-lg hover:bg-amber-600 transition duration-300"
              onClick={buyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
}
    </div>
  );
}

export default Navigating;
