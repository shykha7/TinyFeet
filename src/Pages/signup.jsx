import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
     
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      axios
        .post('http://localhost:4000/users', {
          name: values.name,
          email: values.email,
          password: values.password,
          cart: [],
          isAdmin:false,
           status: "Active"
        })
        .then(() => {
          // Redirect or show a success message after successful submission
          alert('User registered successfully!');
          navigate('/login');
        })
        .catch((err) => {
          // Handle error if the POST request fails
          console.error(err);
          alert('Something went wrong. Please try again.');
        });
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-amber-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-none"
      >
        <h2 className="text-2xl font-semibold text-center text-amber-600 mb-6">Sign Up</h2>

        {/* Name Input */}
        <label htmlFor="name" className="block text-gray-700 mb-2 text-sm">Username</label>
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

        
        <label htmlFor="email" className="block text-gray-700 mb-2 text-sm">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {formik.touched.email && formik.errors.email && (
          <small className="text-red-500 text-xs">{formik.errors.email}</small>
        )}

        {/* Password Input */}
        <label htmlFor="password" className="block text-gray-700 mb-2 text-sm">Password</label>
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

        {/* Confirm Password Input */}
        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 text-sm">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <small className="text-red-500 text-xs">{formik.errors.confirmPassword}</small>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 text-white font-semibold bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          Sign Up
        </button>

        {/* Already have an account link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <span
              className="text-amber-500 hover:underline cursor-pointer"
              onClick={handleNavigate}
            >
              Login here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
