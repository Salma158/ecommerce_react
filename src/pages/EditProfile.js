
import UpdateProfileForm from '../components/UpdateProfileForm';
import { getAuthToken } from '../util/auth';
import { json , redirect, useRouteLoaderData } from 'react-router-dom';
function EditProfile(){
    const data = useRouteLoaderData('profile-details')
    return <UpdateProfileForm profile={data} />;
}

export default EditProfile

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
  
    const userData = {
        username: data.get('username'),
        email: data.get('email'),
        first_name: data.get('firstname'),
        last_name: data.get('lastname'),
        phone_number: data.get('phoneNumber'),
        date_of_birth: data.get('dateOfBirth')
      };
  
    const token = getAuthToken();
    const response = await fetch('http://localhost:8000/users/profiles/', {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(userData),
    });
  
    if (response.status === 422) {
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: 'Could not update user profile.' }, { status: 500 });
    }
  
    return redirect('/profile');
  }