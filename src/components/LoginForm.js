// LoginFormdemo.jsx

import styles from "./LoginForm.module.css";
import loginForm from "./../assets/images/loginForm.jpg";

import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form as BForm,
} from "react-bootstrap";
import { Form as RForm, useNavigation, Link } from "react-router-dom";

const LoginForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col className={styles["image-container"]}>
          <Image src={loginForm} alt="login border" />
          <RForm method="post" className={styles["form-overlay"]}>
            <h2 className="mb-2">Welcome back</h2>
            <p className="mb-4">Please login to your Account</p>
            <BForm.Group controlId="formBasicEmail" className="mb-2">
              <BForm.Label>Email :</BForm.Label>
              <BForm.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
            </BForm.Group>

            <BForm.Group controlId="formBasicPassword" className="mb-2">
              <BForm.Label>Password :</BForm.Label>
              <BForm.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </BForm.Group>
            <p className="mb-4 text-end">
              <Link to="/forgot-password" className={`${styles["custom-link"]} ${styles["custom-link-muted"]}`}>
                Forgot password?
              </Link>
            </p>
            <Button
              type="submit"
              className={styles["login-button"]}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Login"}
            </Button>

            <p className="mt-3">
              Don't have an account yet?{" "}
              <Link to="/register" className={styles["custom-link-sign"]}>
                Sign Up
              </Link>
            </p>
          </RForm>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

