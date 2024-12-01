import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
  return (
    <Layout title={'About Us - Ecommerce App'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src="https://m.media-amazon.com/images/G/31/amazonservices/Blog/What_is_an_E-commerce_business.jpg" alt="About Us" style={{ width: "100%" }} />
        </div>
        <div className="col-md-6">
          <h2>About Our E-commerce Platform</h2>
          <p className="text-justify mt-2">
            Welcome to our Techtones platform, your number one source for all things shopping. 
            We are dedicated to giving you the best online shopping experience, with a focus on 
            quality products, seamless transactions, and excellent customer service.
          </p>
          <p className="text-justify mt-2">
             Our platform has grown from a small business to a comprehensive 
            marketplace offering a wide range of products, from electronics and fashion to home goods. 
            Our mission is to make shopping convenient, accessible, and enjoyable for everyone, 
            no matter where you are.
          </p>
          <p className="text-justify mt-2">
            At our core, we believe in delivering value. That’s why we work with trusted brands and 
            suppliers to ensure every product meets our high standards. Whether you're looking for 
            the latest trends or everyday essentials, we’ve got you covered.
          </p>
          <p className="text-justify mt-2">
            Thank you for choosing us for your online shopping needs. We look forward to serving you!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
