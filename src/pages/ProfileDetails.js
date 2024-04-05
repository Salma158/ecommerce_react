import { json, useRouteLoaderData , redirect} from "react-router-dom";
import { getAuthToken } from "../util/auth";
import MyProfile from "../components/MyProfile";

function ProfileDetailPage() {
  const data = useRouteLoaderData('profile-details');
  
  return <MyProfile profile={data} />;
}

export default ProfileDetailPage;

export async function loader() {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8000/users/profiles/", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch profile details for logged user." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8000/users/profiles/", {
    method: request.method,
    headers: {
    Authorization: "Bearer " + token
    }
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete user profile." },
      {
        status: 500,
      }
    );
  }
  return redirect("/");
}