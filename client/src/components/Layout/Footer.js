import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-dark text-light p-4'>
      <h4 className='text-center mb-2'>All Rights Reserved © TECHTONES</h4>
      <div className='footer'>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
}

export default Footer;
