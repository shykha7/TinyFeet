import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextCreate } from '../App';

function Cart() {
  const userId = localStorage.getItem('id');
  const [cart, setCart] = useState();
  const navigate = useNavigate()
  const {setConcat}= useContext(ContextCreate)
  
  let amount=0


  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${userId}`)
      .then((response) => setCart(response.data.cart));
  }, [userId]);

  const removeProduct= (productId)=>{
    const updatedCart = cart.filter((product)=>product.id != productId)
    axios.patch(`http://localhost:4000/users/${userId}`,{cart:updatedCart})
    .then(()=> {setCart(updatedCart)
      setConcat(cart.length-1)
    })
  }

  const quantity=(quantity,id)=>{
    const updatedCart=cart.map((product)=>{
        if(product.id==id){
            product.quantity = quantity
        }
        return product
    })
    axios.patch(`http://localhost:4000/users/${userId}`,{cart:updatedCart})
    .then(()=> setCart(updatedCart))
  }
 cart? amount = cart.reduce((acc,product)=>acc+product.quantity*product.price,0):null

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h2 className="text-center text-3xl font-semibold mb-8 text-amber-500 ">Shopping Cart</h2>

      <div className="bg-white shadow-lg rounded-lg p-6">
        
        <div className="grid grid-cols-5 gap-4 text-center font-bold text-gray-800 mb-6">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>

       
        <hr className="border-gray-300 mb-6" />

        {cart &&
          cart.map((product) => (
            <div key={product.id} className="grid grid-cols-5 gap-5 items-center mb-5">
             
              <div className="flex items-center space-x-4">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-25 h-25 object-cover rounded-md"
                />
                <span className="text-lg font-medium">{product.name}</span>
              </div>

             
              <div className="text-lg font-medium text-center">${product.price}</div>

              <div className="flex items-center justify-center  gap-2">
                <button className="text-white bg-gray-600 p-2 rounded hover:bg-gray-700" onClick={()=>product.quantity>1?quantity(product.quantity-1,product.id):null}>-</button>
                {product.quantity}
                <button className="text-white bg-gray-600 p-2 rounded hover:bg-gray-700" onClick={()=>quantity(product.quantity+1,product.id)}>+</button>
              </div>

             
              <div className="text-lg font-medium text-center">${Math.ceil(product.quantity*product.price)}</div>

             
              <div className="text-center">
                <button className="text-red-500 hover:text-red-700" onClick={()=>removeProduct(product.id)}>Remove</button>
              </div>
              
            </div>
          ))}

      
        <hr className="border-gray-300 mb-6" />
      </div>

     
      <div className="fixed bottom-10 right-10 bg-white shadow-lg p-6 rounded-lg w-72">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total</span>
          <span>${Math.ceil(amount)}</span>
        </div>

        <div className="text-center">
          <button className="bg-amber-500 text-white px-8 py-3 rounded-md hover:bg-amber-600 transition duration-300 w-full"
          onClick={()=>navigate(`/payment/${null}`,{state:{amount}})}>
            Proceed to Checkout
          </button>
        </div>
      </div>


    </div>
  );
}

export default Cart;
