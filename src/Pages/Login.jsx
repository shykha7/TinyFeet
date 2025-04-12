import React, { use, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
    name: '',
     password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    setIsSubmitting(true);
      axios
        .get('http://localhost:4000/users')
        .then((response) => {
          const user = response.data.find(
            (user) => user.name === values.name && user.password === values.password);
          if (user) {
            localStorage.setItem('id', user.id);
            localStorage.setItem('name', user.name); 
            
           console.log(user.isAdmin);
           
            if(user.name === "admin"){
              localStorage.setItem('isAdmin',true)
              navigate('/dashboard')
            }else{
              navigate('/');
            }
          }
          else{
              setLoginError('Invalid username or password')
          }
          
        })
        
        .catch((err) => {
          console.error('Error fetching users:', err);
          setLoginError('An error occurred. Please try again.');
        })
        .finally(() => {
          setIsSubmitting(false); 
        });

        
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-amber-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-amber-600 mb-6">Login</h2>

        <label htmlFor="name" className="block text-gray-700 mb-2 text-sm">
          Username
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your username"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {formik.touched.name && formik.errors.name && (
          <small className="text-red-500 text-xs">{formik.errors.name}</small>
        )}

        
        <label htmlFor="password" className="block text-gray-700 mb-2 text-sm">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {formik.touched.password && formik.errors.password && (
          <small className="text-red-500 text-xs">{formik.errors.password}</small>
        )}

       
        <button
          type="submit"
          className="w-full py-3 mt-4 text-white font-semibold bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

       
        {loginError && <p className="text-red-500 text-center mt-4">{loginError}</p>}

        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              className="text-amber-500 hover:underline cursor-pointer"
              onClick={() => navigate('/signup')}
         >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
