import  React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useRouteLoaderData, Form } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import AboutUsPage from "../pages/AboutUs";
// import LocalMallIcon from '@mui/icons-material/LocalMall';
import "./Header.css";




function Header({ isHeroHeader }) {
  const token = useRouteLoaderData("root");
  const location = useLocation();

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


