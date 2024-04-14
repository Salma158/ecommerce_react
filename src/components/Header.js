import  {React, useEffect, useState} from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useRouteLoaderData, Form } from "react-router-dom";
import AboutUsPage from "../pages/AboutUs";
import UserDropdown from "./UserDropdown";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../store/cart/cart";
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure to import Font Awesome CSS
import { getAuthToken } from '../util/auth';
import CategoryDropdown from "./CategoryDropdown";
import LocalMallIcon from '@mui/icons-material/LocalMall';




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
             
              <LinkContainer to="/contact-us">
                <Nav.Link>
                  Contact Us
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                      <LocalMallIcon />
                      {token && totalQuantity > 0 && (
                        <span style={{ 
                          position: 'absolute', 
                          top: '-10px', 
                          right: '-10px', 
                          backgroundColor: '#ff5f5f', 
                          color: 'white', 
                          borderRadius: '50%', 
                          padding: '6px', 
                          fontSize: '14px', 
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' 
                        }}>{totalQuantity}</span>
                      )}
                    </div>
                </Nav.Link>
              </LinkContainer>
              <UserDropdown />
              {token && (
                <Form action="/logout" method="post" className="nav-link">
                <button type="submit" className="text-decoration-none"><i className="fa fa-sign-out" aria-hidden="true"></i></button>
                

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


