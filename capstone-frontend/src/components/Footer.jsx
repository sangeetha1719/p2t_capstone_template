// Footer component - displays site footer with company info and links
// Includes branding, navigation, customer service links, and contact information

import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Footer grid layout with 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Store className="size-8 text-blue-500" />
              <span className="text-2xl">TechStore</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted destination for the latest technology and electronics at unbeatable prices.
            </p>
          </div>

          {/* Quick links section */}
          <div>
            <h3 className="text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service section */}
          <div>
            <h3 className="text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Information
                </a>
              </li>
            </ul>
          </div>

          {/* Contact information section */}
          <div>
            <h3 className="text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="size-5 flex-shrink-0 mt-0.5" />
                <span>123 Tech Street, GA 94025</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="size-5 flex-shrink-0" />
                <span>+1 (550) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="size-5 flex-shrink-0" />
                <span>support@techstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-800 mt-8 pt-8 pb-7 text-center text-gray-400">
          <p>© 2025 TechStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
