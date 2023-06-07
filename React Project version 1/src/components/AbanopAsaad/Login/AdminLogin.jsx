import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AdminLogin() {
  let navigate = useNavigate();

  let [json_users_array, setjson_users_array] = useState([]);

  let get_all_admin_users = () => {
    axios
      .get("http://localhost:3005/admin_users")
      .then((response) => {
        setjson_users_array(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    get_all_admin_users();
  }, []);

  // const validate = () => {
  //   get_all_admin_users().then(() => {
  //     console.log(auth.email, auth.password);
  //   });
  // };

  let [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  let [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  let inputHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  let loginHandler = (e) => {
    e.preventDefault();

    if (formValues.email && formValues.password) {
      if (errors.email === "" && errors.password === "") {
        const user = json_users_array.find((user) => {
          return (
            user.email === formValues.email &&
            user.password === formValues.password
          );
        });

        if (user) {
          console.log("login successfully");
          console.log(formValues);

          // set login status to true
          localStorage.setItem("Admin_isLoggedIn", true);
          localStorage.setItem("UserLoginState", true);

          localStorage.setItem("LoggedInUserAdmin", JSON.stringify(user));
          // How to redirect to another page
          // window.location.href = "http://localhost:3000/products";
          navigate("/admin-dashboard");

          setFormValues({
            email: "",
            password: "",
          });
        } else {
          console.log("Invalid email or password");
          alert("Invalid email or password");
        }
      }
    }
  };

  let validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  let validatePassword = (password) => {
    return password.length >= 6;
  };

  let handleBlur = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        if (value.trim() === "") {
          setErrors({
            ...errors,
            email: "Email is required",
          });
        } else if (!validateEmail(value)) {
          setErrors({
            ...errors,
            email: "Invalid email format",
          });
        } else {
          setErrors({
            ...errors,
            email: "",
          });
        }
        break;
      case "password":
        if (value.trim() === "") {
          setErrors({
            ...errors,
            password: "Password is required",
          });
        } else if (!validatePassword(value)) {
          setErrors({
            ...errors,
            password: "Password should be at least 6 characters",
          });
        } else {
          setErrors({
            ...errors,
            password: "",
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="offset-lg-4 col-md-12 col-lg-6 my-5">
      <Form className="container w-75" onSubmit={loginHandler}>
      <div className="card">
      <h1>Welcom Back!</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formValues.email} // Update value attribute
            onChange={inputHandler}
            onBlur={handleBlur}
            required
          />
          <Form.Text className="text-danger">{errors.email}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formValues.password} // Update value attribute
            onChange={inputHandler}
            onBlur={handleBlur}
            required
          />
          <Form.Text className="text-danger">{errors.password}</Form.Text>
        </Form.Group>

        <Button variant="dark" type="submit">
          Login
        </Button>
        </div>
      </Form>
    </div>
  );
}
