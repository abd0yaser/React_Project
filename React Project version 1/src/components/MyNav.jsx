import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export function MyNav() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const UserLoginState = () => {
    const userLoginState = localStorage.getItem("UserLoginState");
    setIsLoggedIn(userLoginState === "true");
  };

  useEffect(() => {
    UserLoginState();
  }, [UserLoginState]);

  const handleLogout = () => {
    localStorage.setItem("UserLoginState", false);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SAY Store</Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/">
              Products
            </NavLink>
            <NavLink className="nav-link" to="/">
              About
            </NavLink>
            {isLoggedIn ? (
              <NavDropdown title="Profile" id="profile-dropdown">
                <NavDropdown.Item href="#action1">Option 1</NavDropdown.Item>
                <NavDropdown.Item href="#action2">Option 2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
