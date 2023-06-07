import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export function AccountSettings() {
  let navigate = useNavigate();
  let [id, setId] = useState("");
  let [username, setUsername] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  useEffect(() => {
    // Fetch user data from localStorage
    const loggedInUser = localStorage.getItem("LoggedInUser");
    const loggedInUserAdmin = localStorage.getItem("LoggedInUserAdmin");

    let parsedLoggedInUser = null;

    if (loggedInUser) {
      parsedLoggedInUser = JSON.parse(loggedInUser);
    } else if (loggedInUserAdmin) {
      parsedLoggedInUser = JSON.parse(loggedInUserAdmin);
    }

    if (parsedLoggedInUser) {
      setId(parsedLoggedInUser.id);
      setUsername(parsedLoggedInUser.username);
      setName(parsedLoggedInUser.name);
      setEmail(parsedLoggedInUser.email);
      setPassword(parsedLoggedInUser.password);
    }
  }, []);

  const updateUser = (e) => {
    e.preventDefault();
    const updatedUser = {
      id: id,
      username: username,
      name: name,
      email: email,
      password: password,
    };

    const loggedInUser = localStorage.getItem("LoggedInUser");
    const loggedInUserAdmin = localStorage.getItem("LoggedInUserAdmin");

    if (loggedInUserAdmin) {
      axios
        .put(`http://localhost:3005/admin_users/${id}`, updatedUser)
        .then((response) => {
          console.log("User updated successfully:", response.data);
          localStorage.setItem(
            "LoggedInUserAdmin",
            JSON.stringify(response.data)
          );
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }

    if (loggedInUser) {
      axios
        .put(`http://localhost:3005/users/${id}`, updatedUser)
        .then((response) => {
          console.log("User updated successfully:", response.data);
          localStorage.setItem("LoggedInUser", JSON.stringify(response.data));
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Account Settings</h1>
          <Form onSubmit={updateUser}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
