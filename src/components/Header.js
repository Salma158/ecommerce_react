import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useRouteLoaderData, Form } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
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
              <span>Ecommerce</span>
            </LinkContainer>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <CategoryDropdown />
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {!token && (
                <Nav.Link as={NavLink} to="/auth?mode=login">
                  Login
                </Nav.Link>
              )}
              {token && (
                <Form action="/logout" method="post">
                  <Nav.Link type="submit">Logout</Nav.Link>
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
