import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserLogin() {
  let navigate = useNavigate();

  let [json_users_array, setjson_users_array] = useState([]);

  let get_all_normal_users = () => {
    axios
      .get("http://localhost:3005/users")
      .then((response) => {
        setjson_users_array(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    get_all_normal_users();
  }, []);

  // const validate = () => {
  //   get_all_normal_users().then(() => {
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
          // How to redirect to another page
          // window.location.href = "http://localhost:3000/products";

          // set login status to true
          localStorage.setItem("UserLoginState", true);
          // Store the logged-in user object in localStorage
          localStorage.setItem("LoggedInUser", JSON.stringify(user));
          // make the login at nav bar be profile

          navigate("/");
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
  // If he does no have an account return to registration page
  let navigateToRegistration = () => {
    navigate("/register");
  };

  return (
    <div className="offset-lg-4 col-md-12 col-lg-6 my-5">
      <div className="container w-75">
        <div className="card">
          <div className="card-header">
            <h1>User Login</h1>
          </div>
          <div className="card-body">
            <Form onSubmit={loginHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formValues.email}
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
                  value={formValues.password}
                  onChange={inputHandler}
                  onBlur={handleBlur}
                  required
                />
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              </Form.Group>

              <Button
                // variant="dark"
                type="submit"
                className="btn btn-success"
              >
                Login
              </Button>

              <div className="text-center mt-3">
                <hr className="w-90 mx-auto" />
                <h5 className="mb-0">New to SAY Store?</h5>
              </div>
              <button
                onClick={navigateToRegistration}
                className="m-3 btn btn-primary"
              >
                Create your SAY account
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
