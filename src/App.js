import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Home from './pages/Home';
import Profile from './pages/profile';
import Cart from './pages/Cart';
import { action as logoutAction } from './pages/Logout';
import Root from './pages/Root'
import Error from './pages/Error';
import SingleProduct from './pages/SingleProduct';
import Produts from './pages/Products'
import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';
import { 
  // checkAuthLoader, 
  tokenLoader } from './util/auth';
import CategoryProducts from './pages/CategoryProducts'; 
import NewArrivals from './pages/NewArrivals';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      {path : 'profile', element : <Profile />},
      {path : 'cart', element: <Cart />},
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
      { path: 'products', element: <Produts />},
      { path: 'product/:id', element: <SingleProduct />},
      { path: 'categories/:categoryId/products', element: <CategoryProducts /> },
      { path: 'new-arrivals', element: <NewArrivals />},

    ]
  },
])

function App() {

  return <RouterProvider router={router}/>
}

export default App;
