// Banner
import React from 'react';
import './Banner.css';

export default function Banner() {
  return (
    <section
      className="banner"
      id="banner"
      style={{
        height: '100vh',
        background: 'url("https://wallpaperaccess.com/full/124383.jpg") no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="content">
        <h3 style={{color:'white'}}>
        Take advantage of our offers and purchase your desired book at the best prices!

        </h3>
        {/* <p>
          This is an e-commerce webiste through which groceries can be bought.
        </p> */}
      
      </div>
    </section>
  );
}
