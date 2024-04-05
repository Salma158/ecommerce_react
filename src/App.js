import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { action as logoutAction } from "./pages/Logout";
import Root from "./pages/Root";
import Error from "./pages/Error";
import AuthenticationPage, { action as authAction } from "./pages/Authentication";
import {
   //checkAuthLoader, 
   tokenLoader } from "./util/auth";
import ProfileDetailPage from "./pages/ProfileDetails";
import { loader as profileDetailsLoader } from "./pages/ProfileDetails";
import { action as editProfileAction } from "./pages/EditProfile";
import EditProfile from "./pages/EditProfile";
import { action as deleteAccountAction } from './pages/ProfileDetails'
import Wishlists from './pages/Wishlists'
import { Provider } from 'react-redux'; // Import Provider from react-redux
// import { loader as wishlistsLoader } from './pages/Wishlists'
import { combineReducers, createStore } from 'redux';
import productReducer from './store/reducers/products';
import Products from './pages/Products'


const rootReducer = combineReducers({
  shop: productReducer
});

const store = createStore(rootReducer);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      // { index: true, element: <Home /> },
      { index: true, element: <Products /> },
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
        // loader: wishlistsLoader
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
