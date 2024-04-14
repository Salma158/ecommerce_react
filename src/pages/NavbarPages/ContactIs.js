import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBTypography } from 'mdb-react-ui-kit';
import contactImage from './../../assets/images/contactUs.jpg';
import Button from '../../components/Button';

function ContactUs() {
  const [alert, setAlert] = useState(null);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    emailjs
      .sendForm('service_hdumv5w', 'template_bhtk90g', form.current, {
        publicKey: '7YmH2OkwhbqNNhxpX',
        ...data
      })
      .then(
        () => {
          setAlert('Message sent successfully!');
          console.log('SUCCESS!');
          // Reset form fields
          form.current.reset();
        },
        (error) => {
          setAlert('Failed to send message. Please try again.');
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <MDBContainer className="py-5" style={{ maxWidth: '1100px' }}>
      <MDBRow className="justify-content-center align-items-center">
        <MDBCol>
          <MDBCard className="my-4 shadow-3">
            <MDBRow className="g-0">
              <MDBCol md="6" className="d-xl-block bg-image">
                <MDBCardImage src={contactImage} alt="Sample photo" fluid />
              </MDBCol>
              <MDBCol md="6">
                <MDBCardBody className="p-md-5 text-black">
                  {alert && (
                    <div className="alert alert-success" role="alert">
                      {alert}
                    </div>
                  )}
                  <form ref={form} onSubmit={sendEmail}>
                    <MDBTypography tag="h3" className="mb-4 text-uppercase">Contact Us</MDBTypography>

                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">Name</label>
                      <MDBInput name="name" type="text" className="form-control" size="lg" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">Email</label>
                      <MDBInput id="email" type="text" className="form-control" size="lg" name="email" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea rows="6" id="message" className="form-control" name="message"></textarea>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <Button
                        type="submit"
                        text="send"
                        value="Send"
                        width="auto"
                        height="auto"
                        backgroundColor="#000000"
                        color="#ffffff"
                      />
                    </div>
                  </form>

                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ContactUs;
