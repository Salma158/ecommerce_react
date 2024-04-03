import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}

        {!isLogin && (
          <>
            <p>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" type="text" name="firstname" required />
            </p>
            <p>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" type="text" name="lastname" required />
            </p>
            <p>
              <label htmlFor="username">Username</label>
              <input id="username" type="text" name="username" required />
            </p>
          </>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {!isLogin && (
          <>
            <p>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
              />
            </p>
            <p>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input id="phoneNumber" type="tel" name="phoneNumber" required />
            </p>
            <p>
              <label htmlFor="dob">Date of Birth</label>
              <input id="dob" type="date" name="dateOfBirth" required />
            </p>
          </>
        )}

        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
