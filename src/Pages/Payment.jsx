

import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import axios from 'axios';

function Payment() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [cart,setCart]=useState([])
    const [product,setProduct]=useState([])
    const userId = localStorage.getItem('id')
    const location=useLocation()
    const price=location.state?.amount||""

    useEffect(()=>{
        axios
      
        .get(`https://db-d0r9.onrender.com/users/${userId}`)
        .then((res)=>setCart(res.data.cart))
        if(id!== 'null'){
            axios
            .get(`https://db-d0r9.onrender.com/products/${id}`)
            .then((res)=>setProduct(res.data))
        }
    },[id,userId ])


    const clearCart = ()=>{
        const updatedCart = cart.filter((product)=>product.id !== id)
        axios.patch(`https://db-d0r9.onrender.com/users/${userId}`,{
            cart : id === 'null' ? [] : updatedCart
        })
    }


    const validationSchema = Yup.object({
        fullname:Yup.string().required("Full Name is required"),
        cardnumber:Yup.string().required('Card number is required')
        .matches(/^\d+$/, "Card number must be 16 digits")
        .length(16, "Card number must be exactly 16 digits"),
        expiry:Yup.string().required('expiry date is required')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter MM/YY format"),
        cvv:Yup.string().required('cvv is required')
        .matches(/^\d{3}$/, "CVV must be 3 digits")
    })
    
    const formik = useFormik({
        initialValues:{
            fullname:'',
            cardnumber:'',
            expiry:'',
            cvv:''
        },
          validationSchema: validationSchema,
        onSubmit: ({resetForm})=>{
            
 
              axios.post("https://db-d0r9.onrender.com/orderhistory",{
                userId : userId,
                items: id === 'null' ? cart : [product],
                price : id === 'null' ? price : product.price
              })
              
              .then((res)=>{
                console.log("Order saved:", res.data)
                Swal.fire({
                    title: 'Success!',
                    text: 'Your payment was successful!',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                  }),

                  clearCart()}
            )
              
           navigate('/orderhistory')
           resetForm()
            
        }
    })

  return (
    <div className='grid place-items-center h-screen'>
   
        <form 
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-none"
        >
        <label htmlFor='fullname'>Card Holder Name</label>
        <br/>
        {formik.touched.fullname && formik.errors.fullname &&(
            <small className='text-red-500 text-xs'>{formik.errors.fullname}</small>
        )}
        <input
        id="fullname"
        type='text'
        name="fullname"
        placeholder='Full Name'
        value={formik.values.fullname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         className="block w-full p-3 mb-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        
        <br/>
        <label htmlFor='cardnumber'>Card Number</label>
        <br/>
        {formik.touched.cardnumber && formik.errors.cardnumber &&(
            <small className='text-red-500 text-xs'>{formik.errors.cardnumber}</small>
        )}
       
        <input
        id="cardnumber"
        type='text'
        name="cardnumber"
        placeholder='XXXX XXXX XXXX XXXX'
        value={formik.values.cardnumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         className="block w-full p-3 mb-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
    
        <label htmlFor='expiry'>Card Expiry</label>
        <br/>
        {formik.touched.expiry && formik.errors.expiry && (
            <small className='text-red-500 text-xs'>{formik.errors.expiry}</small>
        )}
      
        <input
        id="expiry"
        type='text'
        name="expiry"
        value={formik.values.expiry}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         className="block w-full p-3 mb-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        
        
        <label htmlFor='cvv'>CVV</label>
        <br/>
        {formik.touched.cvv && formik.errors.cvv && (
            <small className='text-red-500 text-xs'>{formik.errors.cvv}</small>
        )}
        
        <input
        id="cvv"
        type='text'
        name="cvv"
        value={formik.values.cvv}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button className="w-full py-3 mt-4 text-white font-semibold bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
         type='submit'>
            Pay Now
            </button>
           
        </form>
       
      </div>

  )
}

export default Payment
