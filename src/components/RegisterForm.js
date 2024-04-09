import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form as BForm,
  Image,
} from "react-bootstrap";
import styles from "./RegisterForm.module.css";
import loginForm from "./../assets/images/registerForm.jpg";
import { Form as RForm, useNavigation, useActionData } from "react-router-dom";

const RegisterForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [imageHeight, setImageHeight] = useState(500);
  useEffect(() => {
    let errorsCount = 0;

    if (data) {
      if (data.first_name && data.first_name.length > 0) {
        errorsCount += data.first_name.length;
      }
      if (data.last_name && data.last_name.length > 0) {
        errorsCount += data.last_name.length;
      }
      if (data.username && data.username.length > 0) {
        errorsCount += data.username.length;
      }
      if (data.email && data.email.length > 0) {
        errorsCount += data.email.length;
      }
      if (data.password && data.password.length > 0) {
        errorsCount += data.password.length;
      }
      if (data.phone_number && data.phone_number.length > 0) {
        errorsCount += data.phone_number.length;
      }
      if (data.errors && data.errors.length > 0) {
        errorsCount += data.errors.length;
      }
    }
    const newHeight = 900 + errorsCount * 60;
    setImageHeight(newHeight);
  }, [data]);


  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col className={styles["image-container"]}>
          <Image
            src={loginForm}
            alt="register border"
            style={{ height: imageHeight }}
          />
          <RForm
            method="post"
            encType="multipart/form-data"
            className={styles["form-overlay"]}
            id="registerForm"
          >
            <h2 className="mb-2 mt-2">Create an Account</h2>
            <p className="mb-4">Please fill in the form below to register</p>
            <Row>
              <Col md={6}>
                <BForm.Group controlId="formFirstName" className="mb-2">
                  <BForm.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                  />
                </BForm.Group>
                {data && data.first_name && (
                  <ul className={styles["error-list"]}>
                    {Object.values(data.first_name).map((err, index) => (
                      <li key={index} className={styles["error-item"]}>
                        <span className={styles["error-message"]}>{err}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
              <Col md={6}>
                <BForm.Group controlId="formLastName" className="mb-2">
                  <BForm.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                  />
                </BForm.Group>
                {data && data.last_name && (
                  <ul className={styles["error-list"]}>
                    {Object.values(data.last_name).map((err, index) => (
                      <li key={index} className={styles["error-item"]}>
                        <span className={styles["error-message"]}>{err}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
            </Row>
            <BForm.Group controlId="formUsername" className="mb-2">
              <BForm.Control
                type="text"
                placeholder="Enter username"
                name="username"
              />
            </BForm.Group>
            {data && data.username && (
              <ul className={styles["error-list"]}>
                {Object.values(data.username).map((err, index) => (
                  <li key={index} className={styles["error-item"]}>
                    <span className={styles["error-message"]}>{err}</span>
                  </li>
                ))}
              </ul>
            )}

            <BForm.Group controlId="formEmail" className="mb-2">
              <BForm.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
            </BForm.Group>
            {data && data.email && (
              <ul className={styles["error-list"]}>
                {Object.values(data.email).map((err, index) => (
                  <li key={index} className={styles["error-item"]}>
                    <span className={styles["error-message"]}>{err}</span>
                  </li>
                ))}
              </ul>
            )}
            <Row>
              <Col>
                <BForm.Group controlId="formPassword" className="mb-2">
                  <BForm.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </BForm.Group>
              </Col>

              <Col>
                <BForm.Group controlId="formConfirmPassword" className="mb-2">
                  <BForm.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                </BForm.Group>
              </Col>
            </Row>
            {data && data.password && (
              <ul className={styles["error-list"]}>
                {Object.values(data.password).map((err, index) => (
                  <li key={index} className={styles["error-item"]}>
                    <span className={styles["error-message"]}>{err}</span>
                  </li>
                ))}
              </ul>
            )}
            {data && data.errors && (
              <ul className={styles["error-list"]}>
                {Object.values(data.errors).map((err, index) => (
                  <li key={index} className={styles["error-item"]}>
                    <span className={styles["error-message"]}>{err}</span>
                  </li>
                ))}
              </ul>
            )}
            <Col>
              <BForm.Group controlId="formPhoneNumber" className="mb-2">
                <BForm.Control
                  type="tel"
                  placeholder="Enter phone number"
                  name="phoneNumber"
                />
              </BForm.Group>
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
            <Col>
              <BForm.Group controlId="formImage" className="mb-4">
                <BForm.Control type="file" name="profileImage" />
              </BForm.Group>
            </Col>

            <button
              type="submit"
              style={
                isSubmitting
                  ? { backgroundColor: "#ccc", cursor: "not-allowed" }
                  : null
              }
              className={`${styles["login-button"]} btn`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Sign up"}
            </button>
          </RForm>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
