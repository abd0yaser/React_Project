import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import { StoreproductsCrads } from "./StoreproductsCrads.jsx";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export function Storeproducts() {
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3005/products");
      setProducts(response.data);
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
        <div className="col-lg-12">
          {products.map((product) => (
            <Card style={{ width: "18rem" }} key={product.id}>
              <Card.Img
                variant="top"
                className="w-100"
                style={{ height: "300px", objectFit: "contain" }}
                src={product.image}
                alt={product.productName}
              />
              <Card.Body>
                <Card.Text>Name: {product.productName}</Card.Text>
                <Card.Text>Price: {product.price}</Card.Text>
                <Card.Text>Quantity: {product.quantity}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
