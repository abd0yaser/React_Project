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

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="home">SAY Store</Navbar.Brand>
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
              <NavDropdown
                title={`Hello, ${loginUserName()}`}
                id="profile-dropdown"
              >
                <NavDropdown.Item href="#action2">
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
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
