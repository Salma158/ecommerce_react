import { createBrowserRouter , RouterProvider} from 'react-router-dom';
//import { Container } from 'react-bootstrap'
import Home from './pages/Home';
import { action as logoutAction } from './pages/Logout';
import Root from './pages/Root'
import Error from './pages/Error';
import SingleProduct from './pages/SingleProduct';
import Produts from './pages/Products'
import { checkAuthLoader, tokenLoader } from './util/auth';
import CategoryProducts from './pages/CategoryProducts';
import ProfileDetailPage from "./pages/ProfileDetails";
import { loader as profileDetailsLoader } from "./pages/ProfileDetails";
// import { action as accountAction } from './pages/ProfileDetails'
// import { action as updateProfileAction } from './components/MyProfile/MyProfile'
import Wishlists from './pages/Wishlists'
import MyCart from './pages/Cart';
import ShippingForm from './pages/ShippingForm/ShippingForm';

import LoginPage, {action as authAction } from './pages/LoginPage';
import RegisterPage, {action as registerAction} from './pages/RegisterPage'
import { action as deleteAccount } from './pages/DeleteAccount' 
import NewArrivals from './pages/NewArrivals';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      {
        path: "profile",
        loader: profileDetailsLoader,
        id: 'profile-details',
        children: [
          { index: true,  element: <ProfileDetailPage />,
          //  action: updateProfileAction
          },
          // { path: "edit", element: <EditProfile />, action: editProfileAction}
        ]
      },
      { path: "cart", element: <MyCart /> },
      { path: "address", element: <ShippingForm /> },
      {
        path: "login",
        element: <LoginPage />,
        action: authAction,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "wishlists",
        element: <Wishlists />,
        loader: checkAuthLoader
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "deleteaccount",
        action: deleteAccount
      },
      { path: 'products', element: <Produts />},
      { path: 'product/:id', element: <SingleProduct />},
      { path: 'categories/:categoryId/products', element: <CategoryProducts /> },
      { path: 'new-arrivals', element: <NewArrivals />},
    ]
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
