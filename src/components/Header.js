import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useRouteLoaderData, Form } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import LocalMallIcon from '@mui/icons-material/LocalMall';
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
                <LocalMallIcon />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="wishlists">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Wishlists
                </Nav.Link>
              </LinkContainer>
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
