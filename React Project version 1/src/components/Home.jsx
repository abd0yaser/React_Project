import React from "react";
import Store from "./Store";
import { Carousel } from 'react-bootstrap'

import "../css/MySlider.css"
export function Home() {
  return (
    <div className="hero">
      <div>
        <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://www.lux-review.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/10/fashion-store.jpg.webp"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
      <Store/>
    </div>
  );
}