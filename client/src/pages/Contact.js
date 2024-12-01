import React from 'react';
import backgroundImage from "./white.jpg"
const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>

<div className="min-h-screen flex flex-col justify-center items-center" >
        <div className="max-w-4xl w-full py-8 px-4 sm:px-6 lg:px-8 bg-opacity-75">
          <div className="bg-white bg-opacity-50 shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="info-item flex items-center mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <div>
                    <span className="text-gray-600">Address:</span>
                    <span className="block"> New Delhi</span>
                  </div>
                </div>
                <div className="info-item flex items-center mb-4">
                  <i className="fas fa-phone-alt mr-2"></i>
                  <div>
                    <span className="text-gray-600">Phone:090989090</span>
                    <span className="block"></span>
                  </div>
                </div>
                <div className="info-item flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="block">VerveBridge@gmail.com</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
                <form action="https://formsubmit.co/VerveBridge@gmail.com" method="POST">
                  <div className="form-group mb-4">
                    <input type="text" name="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md text-black" required />
                  </div>
                  <div className="form-group mb-4">
                    <input type="email" name="email" placeholder="Your Email" className="w-full px-3 py-2 border rounded-md text-black" required />
                  </div>
                  <div className="form-group mb-4">
                    <textarea name="message" placeholder="Your Message" className="w-full px-3 py-2 border rounded-md text-black bg-gray-100" rows="5" required></textarea>
                  </div>
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
