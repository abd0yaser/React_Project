import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Products.css";
import { useNavigate } from "react-router-dom";
export function Products() {
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3005/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3005/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="bg-dark p-5 text-center">
      <div className="container">
        <h2 className="text-light mb-5">Admin Dashboard</h2>

        <NavLink to="/products/0/add" className="btn btn-outline-primary mb-5">
          Add New Product
        </NavLink>

        <Table className="text-light" bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.count}</td>
                <td>
                  <NavLink to={`/products/${product.id}/edit`}>
                    <i className="fs-2 text-info mx-1 bi bi-pencil-square"></i>
                  </NavLink>

                  <NavLink to={`/products`}>
                    <i
                      className="fs-2 text-danger mx-1 bi bi-trash3-fill"
                      onClick={() => deleteProduct(product.id)}
                    ></i>
                  </NavLink>

                  <NavLink to={`/products/${product.id}`}>
                    <i className="fs-2 text-warning mx-1 bi bi-eye-fill"></i>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
