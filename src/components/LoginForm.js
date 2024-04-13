import styles from "./LoginForm.module.css";
import loginForm from "./../assets/images/loginForm.jpg";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form as BForm,
} from "react-bootstrap";
import {
  Form as RForm,
  useNavigation,
  Link,
  useActionData,
} from "react-router-dom";

import ForgotPasswordPopup from './ForgotPassword'

const LoginForm = () => {
  const data = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const handleForgotPasswordPopup = () => {
    setShowPasswordPopup(!showPasswordPopup);
  };

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col className={styles["image-container"]}>
          <Image src={loginForm} alt="login border" />
          <RForm method="post" className={styles["form-overlay"]}>
            <h2 className="mb-2">Welcome back</h2>
            <p className="mb-4">Please login to your Account</p>
            <BForm.Group controlId="formBasicEmail" className="mb-2">
              <BForm.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
            </BForm.Group>

            <BForm.Group controlId="formBasicPassword" className="mb-2">
              <BForm.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </BForm.Group>
            <p className="mb-4 text-end">
              <Link
                onClick={handleForgotPasswordPopup}
                className={`${styles["custom-link"]} ${styles["custom-link-muted"]}`}
              >
                Forgot password?
              </Link>
            </p>

            {data && data.errors && (
              <ul className={styles["error-list"]}>
                {Object.values(data.errors).map((err, index) => (
                  <li key={index} className={styles["error-item"]}>
                    <span className={styles["error-message"]}>{err}</span>
                  </li>
                ))}
              </ul>
            )}

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
              {isSubmitting ? "Submitting..." : "Login"}
            </button>

            <p className="mt-3">
              Don't have an account yet?{" "}
              <Link to="/register" className={styles["custom-link-sign"]}>
                Sign Up
              </Link>
            </p>
          </RForm>
        </Col>
      </Row>
      <ForgotPasswordPopup
        show={showPasswordPopup}
        handleClose={handleForgotPasswordPopup}
      />
    </Container>
  );
};

export default LoginForm;
