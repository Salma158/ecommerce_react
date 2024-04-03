import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();

  let authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  if (mode === 'signup') {
    authData = {
      ...authData,
      username: data.get('username'),
      first_name: data.get('firstname'),
      last_name: data.get('lastname'),
      confirm_password: data.get('confirmPassword'),
      phone_number: data.get('phoneNumber'),
      date_of_birth: data.get('dateOfBirth')
    };
  }

  let url;
  if (mode === 'login') {
    url = 'http://localhost:8000/users/login';
  } else if (mode === 'signup') {
    url = 'http://localhost:8000/users/register';
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  console.log(authData)

  if (response.status === 422 || response.status === 401) {
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