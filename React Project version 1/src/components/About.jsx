import React from "react";

const About = () => {
  return (
    <div>
      <div className="aboutus d-flex align-items-center justify-content-center">
        <div className="text-center my-5">
          <h1 className="text-light">SAY Store</h1>
          <p className="text-light" style={{  paddingRight: '1em', paddingLeft: '1em' }}>
            At SAY Store, we prioritize customer satisfaction above all else. Our dedicated team of professionals is committed to providing exceptional customer service. If you have any questions, concerns, or feedback, our support team is always ready to assist you.
          </p>
        </div>
      </div>
      <div className="bg-secondary d-flex align-items-center justify-content-center">
        <div className="text-center my-5">
          <h2 className="text-light">About Our Store</h2>
          <p className="text-light" style={{  paddingRight: '1em', paddingLeft: '1em' }}>
            At SAY Store, we are passionate about providing you with the best online shopping experience. We understand that shopping is not just about purchasing products; it's about finding items that reflect your style, meet your needs, and bring joy to your life.
          </p>
          <p className="text-light" style={{  paddingRight: '1em', paddingLeft: '1em' }}>
            Our mission is to curate a diverse selection of high-quality products from various categories, including electronics, fashion, home decor, beauty, and more. We work closely with trusted suppliers and brands to ensure that every item you find on our website meets our standards of excellence.
          </p>
          <p className="text-light" style={{  paddingRight: '1em', paddingLeft: '1em' }}>
            We believe in the power of simplicity and convenience. That's why we have designed our website to be user-friendly, allowing you to browse through our extensive collection effortlessly. Whether you're looking for the latest fashion trends, innovative gadgets, or stylish home accessories, we've got you covered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;



