import { Link, useSubmit } from 'react-router-dom';
import { action as logoutAction } from './../pages/Logout'
// import classes from './MyProfile.module.css';


// function MyProfile({ profile }) {
//   const submit = useSubmit();

//   function deleteYourAccount() {
//     const proceed = window.confirm('Are you sure you want to delete you account?');

//     if (proceed) {
//       submit(null, { method: 'delete' });
//       logoutAction();
//     }
//   }

//   return (
//     <article className={classes.profile}>
//       {/* <img src={event.image} alt={event.title} /> */}
//       <h1>{profile.first_name} {profile.last_name}</h1>
//       <time>{profile.date_of_birth}</time>
//       <p>{profile.username}</p>
//       <menu className={classes.actions}>
//         <Link to="edit">Edit</Link>
//         <button onClick={deleteYourAccount}>Delete</button>
//       </menu>
//     </article>
//   );
// }

// export default MyProfile;
