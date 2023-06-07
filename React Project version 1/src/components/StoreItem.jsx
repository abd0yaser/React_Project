import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import FormatCurrency from "./FormatCurrency";

const StoreItem = ({ id, name, price, imgUrl }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  // Function to truncate the product name
  const truncateName = (productName, maxLength) => {
    if (productName.length <= maxLength) {
      return productName;
    }
    return productName.slice(0, maxLength) + "...";
  };

  return (
    <Card style={{ width: "18rem", height: "90%", justifyContent: "center" }}>
      <Card.Img
        variant="top"
        src={imgUrl}
        className="w-100"
        style={{ height: "300px", objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <div>
          <Card.Title className="fs-0 " style={{ maxWidth: "100%" }}>
            {truncateName(name, 50)}
          </Card.Title>
          <Card.Text className="text-muted mb-0">
            {FormatCurrency(price)}
          </Card.Text>
        </div>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "0.5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity} in cart</span>
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
