// import React from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import { useRouteLoaderData , Form, NavLink} from "react-router-dom";

// function Header() {
//   const token = useRouteLoaderData("root");

//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
//         <Container>
//           <LinkContainer to="/">
//             <Navbar.Brand>Ecommerce</Navbar.Brand>
//           </LinkContainer>

//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ml-auto">
//               <LinkContainer to="/cart">
//                 <Nav.Link>
//                   <i className="fas fa-shopping-cart"></i>Cart
//                 </Nav.Link>
//               </LinkContainer>
//               {!token && (
//                 <li className="nav-item">
//                   <NavLink
//                     to="/auth?mode=login"
//                     className="nav-link"
//                   >
//                     Login
//                   </NavLink>
//                 </li>
//               )}
//               {token && (
//                 <li className="nav-item">
//                   <Form action="/logout" method="post">
//                     <button className="nav-link">Logout</button>
//                   </Form>
//                 </li>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { useRouteLoaderData, Form } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

function Header() {
  const token = useRouteLoaderData("root");

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Ecommerce</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <CategoryDropdown />
            </Nav>
            <Nav className="ml-auto">
              <LinkContainer to="cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
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
