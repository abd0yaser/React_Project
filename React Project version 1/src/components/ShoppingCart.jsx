import React, { useState, useEffect } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import FormatCurrency from "./FormatCurrency";
import axios from "axios";

const ShoppingCart = ({ isOpen }) => {
  const [storeItems, setStoreItems] = useState([]);

  const { closeCart, cartItems } = useShoppingCart();

  const handleCheckout = () => {
    // Define your checkout logic here, such as redirecting to a checkout page
    console.log("Checkout button clicked!");
  };

  const { removeFromCart } = useShoppingCart();

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3005/products");
        setStoreItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProduct();
  }, []);
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {FormatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout
          </button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
