import  {React, useEffect, useState} from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useRouteLoaderData, Form } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import AboutUsPage from "../pages/AboutUs";
// import LocalMallIcon from '@mui/icons-material/LocalMall';
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../store/cart/cart";
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure to import Font Awesome CSS
import { getAuthToken } from '../util/auth';





function Header({ isHeroHeader }) {
  const location = useLocation();
  const cart = useSelector((state) => state.cart.cart || []); // Ensure cart is initialized as an empty array if null or undefined
  const dispatch = useDispatch();
  const token = getAuthToken();

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const quantity = cart.reduce((total, item) => total + item.quantity, 0);
      setTotalQuantity(quantity);
    }
  }, [cart]);

  const isHomePage = location.pathname === '/';
  return (
    <header className={isHeroHeader ? "hero-header" : (isHomePage ? "home-page-header" : "")}>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand className="brand">
            <LinkContainer to="/">
              <span>Bloomos</span>
            </LinkContainer>
            <i class="fa-thin fa-flower-tulip"></i>

          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="./new-arrivals">
              {/* <Nav.Link>New🌷</Nav.Link> */}
              <Nav.Link>New&nbsp;🌷</Nav.Link>

              </LinkContainer>
            </Nav>
            <Nav className="mr-auto">
              <LinkContainer to="./about-us">
              <Nav.Link>AboutUs</Nav.Link>

              </LinkContainer>
            </Nav>
            <Nav className="ml-auto">
              <CategoryDropdown />
              
              <LinkContainer to="/cart">
                <Nav.Link>
                  {/* <i className="fas fa-shopping-cart"></i>  */}
                  <i class="fa-solid fa-bag-shopping"></i>

                {/* <LocalMallIcon /> */}
                </Nav.Link>
              </LinkContainer>
              { <LinkContainer to="/wishlists">
                <Nav.Link>
                  {/* <i className="fas fa-shopping-cart"></i> */}
                  {/* <i class="fa-solid fa-bag-shopping"></i> */}
                  Wishlist
                </Nav.Link>
              </LinkContainer> }
              {token && (
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className="nav-link"
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              {!token && (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
              {token && (
                <Form action="/logout" method="post" className="nav-link">
                <button type="submit" className="text-decoration-none">Logout</button>
                </Form>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;


// import React, { useState } from "react";
// import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import { NavLink, useLocation } from "react-router-dom";
// import { useRouteLoaderData } from "react-router-dom";
// import CategoryDropdown from "./CategoryDropdown";
// import { searchProducts } from "../store/products/slices/productsSlice";
// import "./Header.css";
// import { useDispatch } from "react-redux"; // Import useDispatch


// function Header({ isHeroHeader }) {
//   const token = useRouteLoaderData("root");
//   const location = useLocation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const dispatch = useDispatch(); // Get dispatch function from Redux


//   const isHomePage = location.pathname === '/';

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== '') {
//       // Dispatch searchProducts action with the entered query
//       dispatch(searchProducts(searchQuery));
//     }
//   };

//   return (
//     <header className={isHeroHeader ? "hero-header" : (isHomePage ? "home-page-header" : "")}>
//       <Navbar expand="lg" collapseOnSelect>
//         <Container>
//           <Navbar.Brand className="brand">
//             <LinkContainer to="/">
//               <span>Ecommerce</span>
//             </LinkContainer>
//           </Navbar.Brand>
          
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="mr-auto">
//               <LinkContainer to="./new-arrivals">
//                 <Nav.Link>New&nbsp;🌷</Nav.Link>
//               </LinkContainer>
//             </Nav>
//             <Nav className="ml-auto">
//               <CategoryDropdown />
//               <Form onSubmit={handleSearch} inline>
//                 <FormControl
//                   type="text"
//                   placeholder="Search"
//                   className="mr-sm-2"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <Button variant="outline-success" type="submit">Search</Button>
//               </Form>
//               <LinkContainer to="/cart">
//                 <Nav.Link>
//                   <i className="fas fa-shopping-cart"></i> Cart
//                 </Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="wishlists">
//                 <Nav.Link>
//                   <i className="fas fa-shopping-cart"></i>Wishlists
//                 </Nav.Link>
//               </LinkContainer>
//               {token && (
//                 <li className="nav-item">
//                   <NavLink
//                     to="/profile"
//                     className="nav-link"
//                   >
//                     Profile
//                   </NavLink>
//                 </li>
//               )}
//               {!token && (
//                 <Nav.Link as={NavLink} to="/login">
//                   Login
//                 </Nav.Link>
//               )}
//               {token && (
//                 <Form action="/logout" method="post" className="nav-link">
//                   <button type="submit" className="text-decoration-none">Logout</button>
//                 </Form>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

// export default Header;


