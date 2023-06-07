import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function MyRegister() {
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3005/users");
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!username) {
      isValid = false;
      newErrors.username = "Please enter a Username";
    } else if (username.length < 3) {
      isValid = false;
      newErrors.username = "Username should be at least 3 characters long";
    } else if (!/^[a-zA-Z]+$/.test(username)) {
      isValid = false;
      newErrors.username = "Username should contain only letters";
    }

    if (!name) {
      isValid = false;
      newErrors.name = "Please enter a Fullname";
    } else if (name.length < 6) {
      isValid = false;
      newErrors.name = "Fullname should be at least 6 characters long";
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      isValid = false;
      newErrors.name = "Fullname should contain only letters";
    }

    if (!password) {
      isValid = false;
      newErrors.password = "Please enter a Password";
    }

    if (password !== confirmPassword) {
      isValid = false;
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!email) {
      isValid = false;
      newErrors.email = "Please enter an Email";
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      isValid = false;
      newErrors.email = "Please enter a valid Email";
    } else if (isEmailAlreadyExists(email)) {
      isValid = false;
      newErrors.email = "Email already exists";
    }

    setErrors(newErrors);

    return isValid;
  };

  const isEmailAlreadyExists = (email) => {
    const normalizedEmail = email.toLowerCase();
    return users.some((user) => user.email.toLowerCase() === normalizedEmail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const myReg = { username, name, email, password };

      axios
        .post("http://localhost:3005/users", myReg)
        .then((res) => {
          alert("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          alert("Failed: " + err.message);
        });
    }
  };

  return (
    <div>
      <div className="offset-lg-4 col-md-12 col-lg-6 my-5">
        <form className="container w-75" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 ">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>User Name</label>
                    <input
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer w-100 text-center">
              <button type="submit" className="btn btn-primary w-50">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
