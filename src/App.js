import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import Home from './pages/Home/Home';
import { action as logoutAction } from './pages/UserProfile/Logout';
import Root from './pages/Root'
import Error from './pages/Error';
import SingleProduct from './pages/Products/SingleProduct';
import Produts from './pages/Products/Products'
import { checkAuthLoader, tokenLoader } from './util/auth';
import CategoryProducts from './pages/NavbarPages/CategoryProducts';
import ProfileDetailPage from "./pages/UserProfile/ProfileDetails";
import { loader as profileDetailsLoader } from "./pages/UserProfile/ProfileDetails";
import Wishlists from './pages/NavbarPages/Wishlists'
import MyCart from './pages/Cart/Cart';
import ShippingForm from './pages/ShippingForm/ShippingForm';
import LoginPage, {action as authAction } from './pages/UserProfile/LoginPage';
import RegisterPage, {action as registerAction} from './pages/UserProfile/RegisterPage'
import { action as deleteAccount } from './pages/UserProfile/DeleteAccount' 
import NewArrivals from './pages/NavbarPages/NewArrivals';
import Orders from './pages/UserOrders/UserOrders';
import Order from './pages/OrderDetails/OrderDetails';
import NotFoundPage from './pages/NotFound'; 
import AboutUsPage from './pages/NavbarPages/AboutUs';
import ContactUs from './pages/NavbarPages/ContactIs'
import ResetPassword from './pages/UserProfile/resetPassword';
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
          { index: true,  element: <ProfileDetailPage />}
        ]
      },
      { path: "cart", element: <MyCart />, loader: checkAuthLoader  },
      { path: "address", element: <ShippingForm /> },
      { path: "orders", element: <Orders/>},
      { path: "order-details/:orderId", element: <Order/>},
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
      { path: 'about-us', element: <AboutUsPage />},
      { path: 'contact-us' , element: <ContactUs />},
      { path: 'reset-password', element: <ResetPassword />}
    ]
  },
  { path: '/*', element: <NotFoundPage /> },

]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}


export default App;

