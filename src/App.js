import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Home from './pages/Home';
import { action as logoutAction } from './pages/Logout';
import Root from './pages/Root'
import Error from './pages/Error';
import SingleProduct from './pages/SingleProduct';
import Produts from './pages/Products'
import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';
import { checkAuthLoader, tokenLoader } from './util/auth';
import CategoryProducts from './pages/CategoryProducts';
import Cart from "./pages/Cart";
import ProfileDetailPage from "./pages/ProfileDetails";
import { loader as profileDetailsLoader } from "./pages/ProfileDetails";
import { action as editProfileAction } from "./pages/EditProfile";
import EditProfile from "./pages/EditProfile";
import { action as deleteAccountAction } from './pages/ProfileDetails'
import Wishlists from './pages/Wishlists'


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
          { index: true,  element: <ProfileDetailPage />, action: deleteAccountAction},
          { path: "edit", element: <EditProfile />, action: editProfileAction}
        ]
      },
      { path: "cart", element: <Cart /> },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
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
      { path: 'products', element: <Produts />},
      { path: 'product/:id', element: <SingleProduct />},
      { path: 'categories/:categoryId/products', element: <CategoryProducts /> },
    ]
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
