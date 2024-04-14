import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

export default function Resetpassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword === confirmNewPassword) {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const uid = params.get('uid');

        const response = await axios.post('http://localhost:8000/users/resetpassword/', {
          token: token,
          uid: uid,
          new_password: newPassword,
          confirm_password: confirmNewPassword,
        });
        
        console.log(response.data);
        // Redirect the user or show a success message
      } catch (error) {
        console.error('Password reset failed:', error.response.data);
        setError('Password reset failed. Please try again.');
      }
    } else {
      setError('Passwords do not match!');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Form onSubmit={handleSubmit}>
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
            className='mb-4'
          />
        </Form.Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
