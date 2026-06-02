// Features
import React from 'react';
import './Features.css';

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="content">
        <h1 className="heading">
          our <span>features</span>
        </h1>
        <div className="box-container">
          <div className="box">
            <img src="/image/Book.jpg" alt="" />
            <h3>Take advantage of our offers and purchase your desired book at the best prices!</h3>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit, quis!
            </p> */}
          </div>
          <div className="box">
            <img src="/image/fast-delivery-vector.webp" alt="" />
            <h3>free delivery</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit, quis!
            </p>
          </div>
          <div className="box">
            <img src="/image/feature-img-3.png" alt="" />
            <h3>easy payment</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit, quis!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
