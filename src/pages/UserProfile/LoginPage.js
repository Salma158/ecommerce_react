import { json, redirect } from 'react-router-dom';

import LoginForm from '../../components/UserProfile/LoginForm'
function LoginPage() {
  return(
    <LoginForm />
  ) ;
}

export default LoginPage;

export async function action({ request }) {

  const data = await request.formData();

  let authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const url = 'https://ecommerce-django-ittf.onrender.com/users/login/';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });


  if (response.status === 422 || response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}