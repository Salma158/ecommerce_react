import { json, redirect } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm';

function LoginPage() {
  return(
    <RegisterForm />
  ) ;
}

export default LoginPage;

export async function action({ request }) {

  const data = await request.formData();

  const authData = new FormData();
  authData.append('email', data.get('email'));
  authData.append('password', data.get('password'));
  authData.append('username', data.get('username'));
  authData.append('first_name', data.get('firstName'));
  authData.append('last_name', data.get('lastName'));
  authData.append('confirm_password', data.get('confirmPassword'));
  authData.append('phone_number', data.get('phoneNumber'));
  authData.append('date_of_birth', data.get('dateOfBirth'));
  authData.append('image', data.get('profileImage'));


  const url = 'http://localhost:8000/users/register/';

  const response = await fetch(url, {
    method: 'POST',
    body: authData,
  });

  if (response.status === 422 || response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not register user.' }, { status: 500 });
  }

  return redirect('/login');
}