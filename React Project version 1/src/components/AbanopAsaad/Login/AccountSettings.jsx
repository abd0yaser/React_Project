import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function AccountSettings() {
  let navigate = useNavigate();
  let [id, setId] = useState("");
  let [username, setUsername] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  //   let update = -1;

  useEffect(() => {
    const loggedInUser = localStorage.getItem("LoggedInUser");
    const loggedInUserAdmin = localStorage.getItem("LoggedInUserAdmin");

    let parsedLoggedInUser = null;

    if (loggedInUser) {
      parsedLoggedInUser = JSON.parse(loggedInUser);
      //   update = 1;
    } else if (loggedInUserAdmin) {
      parsedLoggedInUser = JSON.parse(loggedInUserAdmin);
      //   update = 2;
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
    const loggedInUser = localStorage.getItem("LoggedInUser");
    const loggedInUserAdmin = localStorage.getItem("LoggedInUserAdmin");
    e.preventDefault();
    const updatedUser = {
      id: id,
      username: username,
      name: name,
      email: email,
      password: password,
    };

    if (loggedInUserAdmin) {
      //   let parsedLoggedInUser = JSON.parse(loggedInUserAdmin);
      //   console.log(JSON.stringify(parsedLoggedInUser));
      //   set localstorage to the new data

      axios
        .put(`http://localhost:3005/admin_users/${id}`, updatedUser)
        .then((response) => {
          // Handle successful update
          console.log("User updated successfully:", response.data);

          localStorage.setItem(
            "LoggedInUserAdmin",
            JSON.stringify(response.data)
          );
          navigate("/home");
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating user:", error);
        });
    }
    if (loggedInUser) {
      axios
        .put(`http://localhost:3005/users/${id}`, updatedUser)
        .then((response) => {
          // Handle successful update
          console.log("User updated successfully:", response.data);
          localStorage.setItem("LoggedInUser", JSON.stringify(response.data));
          navigate("/home");
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating user:", error);
        });
    }

    // if (update === 1) {
    //   axios
    //     .put(`http://localhost:3005/users/${id}`, updatedUser)
    //     .then((response) => {
    //       // Handle successful update
    //       console.log("User updated successfully:", response.data);
    //     })
    //     .catch((error) => {
    //       // Handle error
    //       console.error("Error updating user:", error);
    //     });
    // } else if (update === 2) {
    // }
  };

  //   console.log(id);

  return (
    <div>
      <h1>Account Settings</h1>
      <form onSubmit={updateUser}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
