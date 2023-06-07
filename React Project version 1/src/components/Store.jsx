import React from "react";
import { Col, Row } from "react-bootstrap";
import StoreItem from "./StoreItem";
import axios from "axios";
import { useState, useEffect } from "react";


const Store = () => {
  const [storeItems, setStoreItems] = useState([]);

  const getAllProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3005/products");
      setStoreItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    
    <Row className="g-0 justify-content-center">
      {storeItems.map((item) => (
        <Col key={item.id} lg={3} md={4} xl={3} sm={6}>
          <div className="d-flex flex-column align-items-center h-100">
            <StoreItem {...item} />
          </div>
        </Col>
      ))}
    </Row>
  
  );
};

export default Store;