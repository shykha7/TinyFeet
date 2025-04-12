import axios from 'axios';
import { LogOut } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextCreate } from '../App';


const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isAdmin,setisAdmin]=useState('')
  const userId = localStorage.getItem('id')
  const {conCart}=useContext(ContextCreate)
 
  
  useEffect(() => {

    if (userId) {

      axios
        .get(`http://localhost:4000/users/${userId}`)
        .then((response) => {
          setUsername(response.data.name);
          setisAdmin(response.data.isAdmin)
          setcart(response.data.cart)

        })
        .catch((error) => {
          console.log('something went wrong');

        });
    }
  }, [userId]);

  const handlelogout = () => {
    localStorage.removeItem("id");
    window.location.reload()
    navigate('/')
   
  }

  

  return (
  
    <nav className="flex items-center justify-between p-4 bg-amber-50">
      <div className="font-serif text-4xl text-amber-600 font-bold italic tracking-wide hover:text-amber-800 cursor-pointer mr-1">     
      <h1>TinyFeet</h1> 
      </div>



   



      <div className="flex items-center justify-around space-x-5">

         <div className='cursor-pointer '>
          <i className="fas fa-clipboard-check text-amber-600 mr-2 hover:text-amber-800"
           onClick={()=>navigate('/orderhistory')}>
          </i>
        </div>
    

        <div
  className="relative text-amber-600 hover:text-amber-800 cursor-pointer transition-colors duration-300 mr-7"
  onClick={() => navigate('/cart')}
>
  <i className="fas fa-shopping-cart text-xl"></i>
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full px-1.5 py-0.5">
    {conCart}
  </span>
</div>



        <div
          className="text-amber-600 hover:text-amber-800 cursor-pointer transition-colors duration-300 flex item-center">
          {username}
         
          {username ? <button><LogOut onClick={handlelogout} className="h-5 w-5 hover:text-amber-400" /></button> : <i className="fas fa-user text-1xl ml-auto" onClick={() => navigate('/login')}></i>}
         
        </div>
      
      </div>
    </nav>
  );
};

export default Navbar;
