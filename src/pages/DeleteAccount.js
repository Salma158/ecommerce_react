import { redirect } from 'react-router-dom';
import { getAuthToken } from './../util/auth';

const handleDeleteAccount = async () => {
  const confirmation = window.confirm("Are you sure you want to delete your account?");
  if (!confirmation) {
    return;
  }

  const token = getAuthToken();

  try {
    const response = await fetch("http://localhost:8000/users/profiles/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Could not delete user profile.");
    }
    redirect('/');
  } catch (error) {
    console.error("Error deleting profile:", error);
  }
};

export function action() {
  handleDeleteAccount();
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
}
