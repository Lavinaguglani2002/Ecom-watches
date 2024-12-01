// import React from 'react';
// import Header from './Header';
// import Footer from './Footer';
// import { Helmet } from "react-helmet";
// import { Toaster } from "react-hot-toast";
// import { Carousel } from 'react-bootstrap';  // Import Carousel from react-bootstrap

// const Layout = ({ children, title, description, keywords, author }) => {
//     return (
//         <div>
//             <Helmet>
//                 <meta charSet='utf-8' />
//                 <meta name="description" content={description} />
//                 <meta name="keywords" content={keywords} />
//                 <meta name="author" content={author} />
//                 <title>{title}</title>
//             </Helmet>

//             <Header />

//             {/* Carousel Section */}
//             <div className="custom-carousel-container">
//                 <Carousel className="custom-carousel" interval={3000}>  {/* Moves every 3 seconds */}
//                     <Carousel.Item>
//                         <div className="carousel-item-content">
//                             <img
//                                 className="d-block carousel-img"
//                                 src="https://img.freepik.com/premium-photo/generic-smartwatches-isolated-colorfull-background-3d-illustration_960782-6375.jpg"
//                                 alt="First slide"
//                             />
//                             <div className="carousel-text">
//                                 <h3>Exclusive Deals on Headphones</h3>
//                                 <p>Best deals on headphones and microphones. Grab your offer now!</p>
//                             </div>
//                         </div>
//                     </Carousel.Item>

//                     <Carousel.Item>
//                         <div className="carousel-item-content">
//                             <img
//                                 className="d-block carousel-img"
//                                 src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725926400&semt=ais_hybrid"
//                                 alt="Second slide"
//                             />
//                             <div className="carousel-text">
//                                 <h3>High-Quality Audio Products</h3>
//                                 <p>Top-notch sound technology for all your audio needs.</p>
//                             </div>
//                         </div>
//                     </Carousel.Item>

//                     <Carousel.Item>
//                         <div className="carousel-item-content">
//                             <img
//                                 className="d-block carousel-img"
//                                 src="https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-image_3748458.jpg"
//                                 alt="Third slide"
//                             />
//                             <div className="carousel-text">
//                                 <h3>Latest Arrivals</h3>
//                                 <p>Discover the latest arrivals in audio technology and gadgets.</p>
//                             </div>
//                         </div>
//                     </Carousel.Item>
//                 </Carousel>
//             </div>

//             <main style={{ minHeight: "70vh" }}>
//                 <Toaster />
//                 {children}
//             </main>

//             <Footer />
//         </div>
//     );
// };

// Layout.defaultProps = {
//     title: 'Ecommerce app',
//     description: "MERN stack project",
//     keywords: "mern, react, node",
//     author: "lavina"
// };

// export default Layout;
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { Carousel } from 'react-bootstrap';  // Import Carousel from react-bootstrap

const Layout = ({ children, title, description, keywords, author }) => {
    const location = useLocation(); // Get the current route

    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Header />

            {/* Carousel only on the home page ("/") */}
            {location.pathname === "/" && (
                <div className="custom-carousel-container">
                    <Carousel className="custom-carousel" interval={3000}>
                        <Carousel.Item>
                            <div className="carousel-item-content">
                                <img
                                    className="d-block carousel-img"
                                    src="https://img.freepik.com/premium-photo/generic-smartwatches-isolated-colorfull-background-3d-illustration_960782-6375.jpg"
                                    alt="First slide"
                                />
                                <div className="carousel-text">
                                    <h3>Exclusive Deals on Headphones</h3>
                                    <p>Best deals on headphones and microphones. Grab your offer now!</p>
                                </div>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className="carousel-item-content">
                                <img
                                    className="d-block carousel-img"
                                    src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725926400&semt=ais_hybrid"
                                    alt="Second slide"
                                />
                                <div className="carousel-text">
                                    <h3>High-Quality Audio Products</h3>
                                    <p>Top-notch sound technology for all your audio needs.</p>
                                </div>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className="carousel-item-content">
                                <img
                                    className="d-block carousel-img"
                                    src="https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-image_3748458.jpg"
                                    alt="Third slide"
                                />
                                <div className="carousel-text">
                                    <h3>Latest Arrivals</h3>
                                    <p>Discover the latest arrivals in audio technology and gadgets.</p>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            )}

            <main style={{ minHeight: "70vh" }}>
                <Toaster />
                {children}
            </main>

            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: 'Ecommerce app',
    description: "MERN stack project",
    keywords: "mern, react, node",
    author: "lavina"
};

export default Layout;
