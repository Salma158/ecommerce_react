//         {data && data.errors && (
//           <ul>
//             {Object.values(data.errors).map((err) => (
//               <li key={err}>{err}</li>
//             ))}
//           </ul>
//         )}
//         {data && data.message && <p>{data.message}</p>}
import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  NavLink,
  Nav,
  Form as BForm,
} from "react-bootstrap";
import loginFlower from "./loginFlower.jpg";
import { Form as RForm, useNavigation , Link} from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center mt-5">
        <Col md={5} className="login-col">
          <div className="login-container">
            <h2 className="mb-2">Welcome back</h2>
            <p className="mb-4">Please login to your Account</p>
            <RForm method="post">
              <BForm.Group controlId="formBasicEmail" className="mb-2">
                <BForm.Label>Email address</BForm.Label>
                <BForm.Control type="email" placeholder="Enter email" name="email" />
              </BForm.Group>

              <BForm.Group controlId="formBasicPassword" className="mb-2">
                <BForm.Label>Password</BForm.Label>
                <BForm.Control type="password" placeholder="Password" name="password" />
              </BForm.Group>
              <p className="mb-4 text-muted text-end">
                <a to="/forgot-password">Forgot password?</a>
              </p>
              <Button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </Button>

              <p className="mt-3">
                Don't have an account yet? 
                
                <Link to="/register" className="custom-link">
                  Sign Up
                </Link>
              </p>
            </RForm>
          </div>
        </Col>
        <Col md={5} className="photo-col">
          <div className="photo-container">
            <img
              src={loginFlower}
              alt="Beautiful Photo"
              className="login-image"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
