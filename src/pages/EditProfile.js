
import UpdateProfileForm from '../components/UpdateProfileForm';
import { getAuthToken } from '../util/auth';
import { json , redirect, useRouteLoaderData } from 'react-router-dom';
function EditProfile(){
    const data = useRouteLoaderData('profile-details')
    return <UpdateProfileForm profile={data} />;
}

export default EditProfile

