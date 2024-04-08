import React from "react";
import { Container, Row, Col, Button, Form as BForm } from "react-bootstrap";
import { Form as RForm } from "react-router-dom";
// import loginFlower from "./loginFlower.jpg"; // Import your image file
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  return (
    <Container fluid>
      <Row
        className={`${styles.registerationRow} justify-content-center align-items-stretch mt-5 mb-5`}
      >
        <Col md={5} className={styles.registerCol}>
          <div className={styles.registerContainer}>
            <h2 className="mb-2">Create an Account</h2>
            <p className="mb-4">Please fill in the form below to register</p>
            <RForm method="post" encType="multipart/form-data">
              <Row>
                <Col md={6}>
                  <BForm.Group controlId="formFirstName" className="mb-2">
                    <BForm.Label>First Name</BForm.Label>
                    <BForm.Control
                      type="text"
                      placeholder="Enter first name"
                      name="firstName"
                    />
                  </BForm.Group>
                </Col>
                <Col md={6}>
                  <BForm.Group controlId="formLastName" className="mb-2">
                    <BForm.Label>Last Name</BForm.Label>
                    <BForm.Control
                      type="text"
                      placeholder="Enter last name"
                      name="lastName"
                    />
                  </BForm.Group>
                </Col>
              </Row>
              {/*remove this */}
              <BForm.Group controlId="formUsername" className="mb-2">
                <BForm.Label>Username</BForm.Label>
                <BForm.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                />
              </BForm.Group>

              <BForm.Group controlId="formEmail" className="mb-2">
                <BForm.Label>Email address</BForm.Label>
                <BForm.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                />
              </BForm.Group>
              <Row>
                <Col>
                  <BForm.Group controlId="formPassword" className="mb-2">
                    <BForm.Label>Password</BForm.Label>
                    <BForm.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </BForm.Group>
                </Col>
                <Col>
                  <BForm.Group controlId="formConfirmPassword" className="mb-2">
                    <BForm.Label>Confirm Password</BForm.Label>
                    <BForm.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                    />
                  </BForm.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <BForm.Group controlId="formPhoneNumber" className="mb-2">
                    <BForm.Label>Phone Number</BForm.Label>
                    <BForm.Control
                      type="tel"
                      placeholder="Enter phone number"
                      name="phoneNumber"
                    />
                  </BForm.Group>
                </Col>
                <Col>
                  <BForm.Group controlId="formDateOfBirth" className="mb-2">
                    <BForm.Label>Date of Birth</BForm.Label>
                    <BForm.Control
                      type="date"
                      placeholder="Date of Birth"
                      name="dateOfBirth"
                    />
                  </BForm.Group>
                </Col>
              </Row>

              {/*remove this */}

              <BForm.Group controlId="formImage" className="mb-4">
                <BForm.Label>Profile Image</BForm.Label>
                <BForm.Control type="file" name="profileImage" />
              </BForm.Group>

              <Button type="submit" className={styles.registerButton}>
                Sign up
              </Button>
            </RForm>
          </div>
        </Col>

        <Col md={5} className={styles.photoCol}>
          {/* <div className={styles.photoContainer}>
            <img
              src={loginFlower}
              alt="Registration Photo"
              className={styles.registerImage}
            />
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
