import React, { useState, useEffect } from "react";
import axios from "axios";

export function UserAccountSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Retrieve user data from local storage
    const loggedInUserAdmin = localStorage.getItem("LoggedInUserAdmin");
    const userLoginState = localStorage.getItem("UserLoginState");

    if (loggedInUserAdmin && userLoginState) {
      const user = JSON.parse(loggedInUserAdmin);
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setIsAdmin(userLoginState === "true" && user.Admin_isLoggedIn === "true");
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update user data in local storage
    const loggedInUserAdmin = localStorage.getItem("LoggedInUserAdmin");
    const userLoginState = localStorage.getItem("UserLoginState");

    if (loggedInUserAdmin && userLoginState) {
      const user = JSON.parse(loggedInUserAdmin);
      user.name = name;
      user.email = email;
      user.password = password;
      localStorage.setItem("LoggedInUserAdmin", JSON.stringify(user));

      if (isAdmin) {
        try {
          await axios.put(`http://localhost:3005/admin_users/${user.id}`, user);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await axios.put(`http://localhost:3005/users/${user.id}`, user);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="container">
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
