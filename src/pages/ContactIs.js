import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_nys1xys', 'template_g0dic4n', form.current, {
        publicKey: 'liSy_Y_DUSdApdvJs',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};


export default ContactUs;