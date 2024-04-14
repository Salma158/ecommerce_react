import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import styles from "./resetPassword.module.css"; // Check if this is the correct path

export default function Resetpassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [errorData, setErrorData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const uid = params.get('uid');

      const formData = {
        token: token,
        uid: uid,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      }

      const response = await fetch('https://ecommerce-django-ittf.onrender.com/users/resetpassword/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      if (response.status === 422 || response.status === 400) {
        const errorResponse = await response.json();
        setErrorData(errorResponse);
        console.log(errorData)
        return;
      }

    } catch(error){
      console.log("error resetting password" , error)
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Form onSubmit={handleSubmit}> {/* Added onSubmit event handler */}
        <h2>Password Change Form</h2>
        <Form.Group controlId="newPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmNewPassword">
          <Form.Label>Confirm New Password:</Form.Label>
          <Form.Control
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className={styles["error-list"]}
          />
        </Form.Group>
        {errorData && errorData.errors && (
          <ul className={styles["error-list"]}>
            {Object.values(errorData.errors).map((err, index) => (
              <li key={index} className={styles["error-item"]}>
                <span className={styles["error-message"]}>{err}</span>
              </li>
            ))}
          </ul>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button> {/* Added type="submit" */}
      </Form>
    </Container>
  );
}
