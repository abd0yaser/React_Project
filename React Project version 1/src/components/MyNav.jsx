import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const navigate_to_Account_Settings = (params) => {
    navigate("/account-settings");
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
                <Button
                  variant="outline-light"
                  className="rounded-circle"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cart3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>{" "}
                  <div
                    className="rounded-circle bg-secondary d-flex justify-content-center align-item-center "
                    style={{}}
                  >
                    3
                  </div>
                </Button>

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
