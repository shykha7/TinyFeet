import React, { useEffect, useState } from 'react';
import Sidenavbar from './Sidenavbar';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Products() {
  const [products, setProducts] = useState([]);
  const [activeView, setActiveView] = useState('list'); // 'list', 'add', 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    axios.get('http://localhost:4000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Common formik for Add & Edit
  const formik = useFormik({
    initialValues: {
      name: selectedProduct?.name || '',
      category: selectedProduct?.category || '',
      description: selectedProduct?.description || '',
      amount: selectedProduct?.price || '',
      image: selectedProduct?.image_url || ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      category: Yup.string().required('Specify the category'),
      description: Yup.string().required('Description is required'),
      amount: Yup.string().required('Amount is required'),
      image: Yup.string().required('Image URL is required')
    }),
    onSubmit: (values) => {
      if (activeView === 'add') {
        axios.post(`http://localhost:4000/products`, {
          name: values.name,
          description: values.description,
          price: values.amount,
          category: values.category,
          image_url: values.image
        })
          .then(() => {
            alert('Added a new Product');
            setActiveView('list');
            refreshProducts();
          })
          .catch(() => alert('Something went wrong'));
      } else if (activeView === 'edit' && selectedProduct) {
        axios.put(`http://localhost:4000/products/${selectedProduct.id}`, {
          name: values.name,
          description: values.description,
          price: values.amount,
          category: values.category,
          image_url: values.image
        })
          .then(() => {
            alert('Product updated');
            setActiveView('list');
            refreshProducts();
          })
          .catch(() => alert('Something went wrong'));
      }
    }
  });

  const refreshProducts = () => {
    axios.get('http://localhost:4000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/products/${id}`)
      .then(() => {
        alert('Product deleted');
        refreshProducts();
      })
      .catch(() => alert('Something went wrong'));
  };

  return (
    <div className="flex min-h-screen">
      <Sidenavbar />

      <div className="flex-1 p-8 bg-gray-100">

        {/* PRODUCT LIST VIEW */}
        {activeView === 'list' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <input
                type="search"
                placeholder="Search Products"
                className="px-4 py-2 border border-gray-300 rounded-md w-1/3"
              />
              <button
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                onClick={() => { setActiveView('add'); setSelectedProduct(null); }}
              >
                Add Product
              </button>
            </div>

            <div className="flex justify-center w-full p-4">
              <div className="w-full max-w-5xl">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-4 gap-4 text-gray-700 font-semibold bg-white p-4 rounded-md shadow mb-4">
                  <div>Name</div>
                  <div>Category</div>
                  <div>Edit</div>
                  <div>Delete</div>
                </div>

                {/* Table Rows */}
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 items-center bg-white p-4 rounded-md shadow mb-4 hover:shadow-md transition duration-300"
                    >
                      <div className="text-lg font-medium">{product.name}</div>
                      <div className="text-gray-600">{product.category}</div>
                      <div>
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => { setActiveView('edit'); setSelectedProduct(product); }}
                        >
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 mt-8">No products found.</div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ADD / EDIT PRODUCT FORM */}
        {(activeView === 'add' || activeView === 'edit') && (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4" onSubmit={formik.handleSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                {activeView === 'add' ? 'Add Product' : 'Edit Product'}
              </h2>

              {/* Form Fields */}
              {['name', 'category', 'description', 'amount', 'image'].map((field) => (
  <div key={field}>
    {formik.touched[field] && formik.errors[field] && (
      <small className="text-red-500 text-xs">{formik.errors[field]}</small>
    )}
    <label htmlFor={field} className="block text-gray-600 mb-1 capitalize">
      {field === 'description' ? 'Description' : field === 'amount' ? 'Amount' : field === 'image' ? 'Image URL' : field}
    </label>
    {field === 'image' ? (
      <input
        id={field}
        name={field}
        type="file"
        onChange={(event) => {
          const file = event.currentTarget.files[0];
          if (file) {
            formik.setFieldValue(field, file.name); // save filename or handle file upload separately
          }
        }}
        onBlur={formik.handleBlur}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
      />
    ) : (
      <input
        id={field}
        name={field}
        type={field === 'amount' ? 'number' : 'text'}
        value={formik.values[field]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
      />
    )}
  </div>
))}


              {/* Submit Button */}
              <button
                className="w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition duration-300"
                type="submit"
              >
                {activeView === 'add' ? 'Add Product' : 'Update Product'}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => { setActiveView('list'); setSelectedProduct(null); }}
                className="w-full mt-2 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
