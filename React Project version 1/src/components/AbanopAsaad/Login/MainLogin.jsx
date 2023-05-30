import React from "react";
// import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// css

import "./MainLogin.css";

export function MainLogin() {
  let navigate = useNavigate();

  const handleAdminCardClick = () => {
    navigate("/admin-login");
  };

  const handleUserCardClick = () => {
    navigate("/user-login");
  };

  return (
    <section className="cards" id="Technologies">
      <h2 className="title">Which user you are</h2>
      <div className="content">
        {/* Admin */}
        <div className="card" onClick={handleUserCardClick}>
          <div className="icon">
            <i className="bi bi-box-arrow-in-left"></i>
          </div>
          <div className="info">
            <h3>USER</h3>
          </div>
        </div>
        {/* User */}
        <div className="card" onClick={handleAdminCardClick}>
          <div className="icon">
            <i className="bi bi-box-arrow-in-right"></i>
          </div>
          <div className="info">
            <h3>ADMIN</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
