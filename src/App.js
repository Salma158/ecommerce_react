import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/profile';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Root from './pages/Root'
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {path : '/', element : <Home />},
      {path : '/profile', element : <Profile />},
      {path : '/cart', element: <Cart />},
      {path : '/login', element: <Login />},
    ]
  },
])

function App() {

  return <RouterProvider router={router}/>
}

export default App;
