import React from 'react';


function Footer() {



  return (
  

    <footer className="bg-amber-600 text-white py-12">
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
          <div>
            <h3 className="text-2xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-amber-400 transition duration-300">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-amber-400 transition duration-300">Shipping Information</a></li>
              <li><a href="#" className="hover:text-amber-400 transition duration-300">Contact Us</a></li>
            </ul>
          </div>

       
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition duration-300" >About Us</a></li>
              <li><a href="#" className="hover:text-amber-400 transition duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-amber-400 transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition duration-300">Terms & Conditions</a></li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <ul>
              <li className="mb-2"><strong>Phone:</strong> <a href="tel:+123456789" className="hover:text-amber-400 transition duration-300">+1 (234) 567-890</a></li>
              <li className="mb-2"><strong>Email:</strong> <a href="mailto:support@tinyfeet.com" className="hover:text-amber-400 transition duration-300">support@tinyfeet.com</a></li>
              <li><strong>Address:</strong> 123 TinyFeet Lane, Baby City, BC 12345</li>
            </ul>
          </div>


          <div>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-amber-400 transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition duration-300">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>

       
        <div className="mt-12 text-center text-sm text-amber-100">
          <p>&copy; 2025 TinyFeet. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
