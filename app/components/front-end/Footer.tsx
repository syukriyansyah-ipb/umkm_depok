import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import { LuCircleArrowUp } from 'react-icons/lu';

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 mt-16 w-full">
      <div className="max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm">
              We are a leading e-commerce platform providing a wide range of products to cater to all your needs. 
              Our mission is to deliver quality and convenience to our customers.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">
              Email: support@ecommanda.com<br />
              Phone: +62 888123445<br />
              Address: West Java, Indonesia
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <p className="text-sm">
              For any support inquiries, please visit our <a href="#" className="hover:text-white transition-colors">Support Center</a> or contact us at support@ecommanda.com.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href="https://x.com/ATEEZofficial"
                className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://www.instagram.com/amandau._.u/"
                className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-200 mb-4">
          <a href="#" className="hover:text-white mx-2 transition-colors">
            Privacy Policy
          </a>
          |
          <a href="#" className="hover:text-white mx-2 transition-colors">
            Terms of Service
          </a>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-purple-500 hover:bg-gray-200 transition-colors py-2 px-4 rounded-full flex items-center justify-center"
          >
            <LuCircleArrowUp className="text-2xl" />
          </button>
        </div>

        <p className="text-sm mt-4">
          &copy; {new Date().getFullYear()} Mandaa. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
