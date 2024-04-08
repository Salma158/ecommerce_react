import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button, Nav } from "react-bootstrap";
import styles from "./MyProfile.module.css";
import { getAuthToken } from "../../util/auth";
import { Form as RForm } from "react-router-dom"
import ChangePasswordPopup from "./../ChangePasswordPopup";

function MyProfile({ profile }) {
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const token = getAuthToken();

    try {
      const response = await fetch("http://localhost:8000/users/profiles/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Could not update user profile.");
      }
      setEditMode(!editMode)
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

  return (
    <Container fluid>
      <Row className={`${styles.profileRow} justify-content-center align-items-stretch mt-5`}>
        <Col md={4} xs={12} className={styles.photoCol}>
          <div className={styles.profileContainer}>
            <Image src={profile.image} className={styles.profileImage} roundedCircle />
            <div className={styles.profileDetails}>
              <div>{profile.first_name} {profile.last_name}</div>
              <Nav.Link onClick={handlePasswordPopup}>Change Password</Nav.Link>
              <RForm action="/deleteaccount" method="post" className="nav-link">
              <button type="submit" className={styles.logoutbutton}  >Delete Account</button>
              </RForm>
              <RForm action="/logout" method="post" className="nav-link">
              <button type="submit" className={styles.logoutbutton} >Logout</button>
              </RForm>
            </div>
          </div>
        </Col>
        <Col md={5} xs={12} className={styles.formCol}>
          <div className={styles.formContainer}>
            <Form onSubmit={handleFormSubmit}>
              <Row className="mb-2">
                <Col>
                  <Form.Group controlId="firstname">
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
                  <Form.Group controlId="lastname">
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
                  <Form.Group controlId="phone">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="birthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className={styles.textRight}>
                  {editMode ? (
                    <>
                      <Button variant="secondary" className={styles.updateButton} onClick={toggleEditMode}>
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
                    </>
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
      <ChangePasswordPopup show={showPasswordPopup} handleClose={handlePasswordPopup} />
    </Container>
  );
}

export default MyProfile;
