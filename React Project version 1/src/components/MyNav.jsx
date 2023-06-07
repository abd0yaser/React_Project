import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function MyNav() {
  const { openCart, cartQuantity } = useShoppingCart();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const UserLoginState = () => {
    const userLoginState = localStorage.getItem("UserLoginState");
    setIsLoggedIn(userLoginState === "true");
  };

  // for Admin
  const [isAdminLoggedIn, setisAdminLoggedIn] = useState(false);

  const AdminLoginState = () => {
    const userLoginState = localStorage.getItem("Admin_isLoggedIn");
    setisAdminLoggedIn(userLoginState === "true");
  };
  //

  useEffect(
    () => {
      UserLoginState();
      AdminLoginState();
    },
    [UserLoginState],
    [AdminLoginState]
  );

  // get login user name from local storage to display on navbar
  const loginUserName = () => {
    const LoggedInUserAdmin = localStorage.getItem("LoggedInUserAdmin");
    const LoggedInUser = localStorage.getItem("LoggedInUser");

    const parsedLoggedInUserAdmin = JSON.parse(LoggedInUserAdmin);
    const parsedLoggedInUser = JSON.parse(LoggedInUser);

    if (parsedLoggedInUserAdmin && parsedLoggedInUserAdmin.name !== null) {
      return parsedLoggedInUserAdmin.name;
    } else if (parsedLoggedInUser && parsedLoggedInUser.name !== null) {
      return parsedLoggedInUser.name;
    } else {
      return "";
    }
  };

  const handleLogout = () => {
    localStorage.setItem("UserLoginState", false);

    localStorage.setItem("Admin_isLoggedIn", false);

    // Remove an item from localStorage
    localStorage.removeItem("LoggedInUser");

    localStorage.removeItem("LoggedInUserAdmin");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navigate_to_Account_Settings = (params) => {
    navigate("/account-settings");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SAY Store</Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/store">
              Store
            </NavLink>
            
            {isLoggedIn ? (
              <NavDropdown
                title={`Hello, ${loginUserName()}`}
                id="profile-dropdown"
              >
                <NavDropdown.Item onClick={navigate_to_Account_Settings}>
                  Account Settings
                </NavDropdown.Item>

                {isAdminLoggedIn && (
                  <NavDropdown.Item href="http://localhost:3000/admin-dashboard">
                    AdminDashboard
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                {/* <NavLink className="nav-link" to="/register">
                  Register
                </NavLink> */}
              </>
            )}
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </Nav>
          {cartQuantity > 0 && (
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={openCart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-item-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
        </Container>
      </Navbar>
    </div>
  );
}
