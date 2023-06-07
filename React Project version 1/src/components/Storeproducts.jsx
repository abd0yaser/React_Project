import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export function Storeproducts() {
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
    <div className="container w-100">
      <h1>Products</h1>
      <div className="row w-100">
        {storeItems.map((product) => (
          <Card style={{ width: "18rem" }} key={product.id}>
            <Card.Img
              variant="top"
              className="w-100"
              style={{ height: "300px", objectFit: "contain" }}
              src={product.imgUrl}
              alt={product.productName}
            />
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Text>{product.name}</Card.Text>
              <Card.Text>Price: {product.price}</Card.Text>
              <Button variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
