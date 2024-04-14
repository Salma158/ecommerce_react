import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button, Nav } from "react-bootstrap";
import styles from "./MyProfile.module.css";
import { getAuthToken } from "../../util/auth";
import { Form as RForm } from "react-router-dom";
import ChangePasswordPopup from "./ChangePasswordPopup";
import { useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import { Link } from "react-router-dom"

function MyProfile({ profile }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: profile.username,
    email: profile.email,
    first_name: profile.first_name,
    last_name: profile.last_name,
    phone_number: profile.phone_number,
    date_of_birth: profile.date_of_birth,
  });

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setErrorData] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const token = getAuthToken();

    try {
      const response = await fetch("https://ecommerce-django-ittf.onrender.com/users/profiles/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 422 || response.status === 400) {
        const errorResponse = await response.json(); // Get error response data
        setErrorData(errorResponse); // Store error response data in state
        return; // Stop further execution
      }

      if (!response.ok) {
        throw new Error("Could not update user profile.");
      }

      setEditMode(!editMode);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handlePasswordPopup = () => {
    setShowPasswordPopup(!showPasswordPopup);
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    const confirmation = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmation) {
      return;
    }
    const token = getAuthToken();
    const url = "https://ecommerce-django-ittf.onrender.com/users/profiles/";

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Could not delete user.");
      }
      console.log("deleted");

      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <Container fluid>
      <Row
        className={`${styles.profileRow} justify-content-center align-items-stretch mt-5`}
      >
        <Col md={4} xs={12} className={styles.photoCol}>
          <div className={styles.profileContainer}>
            <Image
              src={profile.image}
              className={styles.profileImage}
              roundedCircle
            />
            <div className={styles.profileDetails}>
              <div>
                {profile.first_name} {profile.last_name}
              </div>
              <Link to="/orders" className="nav-link">
                Orders
                <button text="Orders" ></button>
              </Link>

              <Nav.Link onClick={handlePasswordPopup}>Change Password</Nav.Link>
              <Form className="nav-link">
                <button
                  type="submit"
                  className={styles.logoutbutton}
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </Form>
              <RForm action="/logout" method="post" className="nav-link">
                <button type="submit" className={styles.logoutbutton}>
                  Logout
                </button>
              </RForm>
            </div>
          </div>
        </Col>
        <Col md={5} xs={12} className={styles.formCol}>
          <div className={styles.formContainer}>
            <Form onSubmit={handleFormSubmit}>
              <Row className="mb-2">
                <Col>
                  <Form.Group controlId="first_name">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="last_name">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="username" className="mb-2">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-2">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>

              <Row className="mb-2">
                <Col>
                  <Form.Group controlId="phone_number">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Form.Group>
                  {data && data.phone_number && (
                    <ul className={styles["error-list"]}>
                      {Object.values(data.phone_number).map((err, index) => (
                        <li key={index} className={styles["error-item"]}>
                          <span className={styles["error-message"]}>{err}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Col>
              </Row>
              <Row>
                <Col className={styles.textRight}>
                  {editMode ? (
                    <div>
                      <Button
                        variant="secondary"
                        className={styles.updateButton}
                        onClick={toggleEditMode}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        className={styles.updateButton}
                        onClick={handleFormSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      className={styles.updateButton}
                      onClick={toggleEditMode}
                    >
                      Update
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      <ChangePasswordPopup
        show={showPasswordPopup}
        handleClose={handlePasswordPopup}
      />
    </Container>
  );
}

export default MyProfile;
