import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { getAuthToken } from "../../util/auth";
import Button from "../Button";

function ForgotPasswordPopup({ show, handleClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    try {
      const response = await fetch("http://localhost:8000/users/forgetpassword/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Could not request password reset."); 
      }
      console.log("Password reset request successful.");
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Get a new Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="mb-2">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} text="Submit" />
      </Modal.Footer>
    </Modal>
  );
}

export default ForgotPasswordPopup;
