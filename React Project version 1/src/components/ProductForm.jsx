import axios from "axios";
import React, { useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

export function ProductForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  let [product, setProduct] = useState({});
  let [formValues, setFormValues] = useState({
    productName: "",
    price: "",
    quantity: "",
  });

  let formOperation = (e) => {
    e.preventDefault();

    if (id == 0) {
      axios
        .post("http://localhost:3005/products", formValues)
        .then((response) => {
          navigate("/products");
        });
    } else {
      // edit
      axios.put(`http://localhost:3005/products/${id}`, formValues).then(() => {
        navigate("/products");
      });
    }
  };

  let OperationHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  let getProduct = async () => {
    let response = await axios.get(`http://localhost:3005/products/${id}`);
    setProduct(response.data);
    setFormValues(response.data);
  };
  useEffect(() => {
    if (id != 0) {
      getProduct();
    }
  }, []);
  return (
    <div className="container mt-5 alert alert-secondary p-5">
      <Form onSubmit={formOperation}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            onChange={OperationHandler}
            name="productName"
            type="text"
            placeholder="Enter Product Name"
            defaultValue={product.productName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={OperationHandler}
            name="price"
            type="number"
            placeholder="Enter Product Price"
            defaultValue={product.price}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            onChange={OperationHandler}
            name="quantity"
            type="number"
            placeholder="Enter Product Quantity"
            defaultValue={product.quantity}
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          {id == 0 ? "Add Product" : "Edit Product"}
        </Button>
      </Form>
    </div>
  );
}
