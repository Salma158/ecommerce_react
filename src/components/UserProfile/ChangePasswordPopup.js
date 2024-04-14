import React, { useState } from "react";
import { Modal, Form} from "react-bootstrap";
import { getAuthToken } from "../../util/auth";
import Button from "../Button"

function ChangePasswordPopup({ show, handleClose }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();

    const data = {
      password: password,
      confirm_password: confirmPassword
    };

    try {
      const response = await fetch("https://ecommerce-django-ittf.onrender.com/users/profiles/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Could not change password.");
      }
    } catch (error) {
      console.error("Error changing the password:", error);
    }
    setPassword("");
    setConfirmPassword("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="newPassword" className="mb-3">
            <Form.Label>New Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm New Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              name="confirm_password"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} text="Submit" backgroundColor="#000000" />
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePasswordPopup;
