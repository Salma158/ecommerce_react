import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";

import classes from "./updateProfileForm.module.css";

function UpdateProfileForm({ method, profile }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method="patch" className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}

      <p>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" type="text" name="firstname" required defaultValue={profile && profile.first_name }/>
      </p>
      <p>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" type="text" name="lastname" required defaultValue={profile && profile.last_name}/>
      </p>
      <p>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" name="username" required defaultValue={profile && profile.username} />
      </p>

      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required defaultValue={profile && profile.email} />
      </p>
      <p>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input id="phoneNumber" type="tel" name="phoneNumber" required defaultValue={profile && profile.phone_number}/>
      </p>
      <p>
        <label htmlFor="dob">Date of Birth</label>
        <input id="dob" type="date" name="dateOfBirth" required defaultValue={profile && profile.date_of_birth }/>
      </p>

      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Update"}
        </button>
      </div>
    </Form>
  );
}

export default UpdateProfileForm;