import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { Form } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MyForm = () => {
    return (
        <Form action="/logout" method="post" >
                <button type="submit" className="text-decoration-none">Logout</button>
        </Form>
    );
  };

function UserDropdown() {

    const token = getAuthToken()

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" style={{ background: "transparent", color: "inherit", border: "none", fontSize: "1.6rem" , textDecoration: "none"}}>
      <FontAwesomeIcon icon={faUser} />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ background: "transparent" }}>
      {token && (
          <Dropdown.Item style={{background: "white"}}>
            <NavLink to="/wishlists" style={{ textDecoration: "none" , color: "Black" , fontSize: "1.5rem" , fontStyle: "Bold"}}>wishlist</NavLink>
          </Dropdown.Item>
      )}
      {token && (
          <Dropdown.Item style={{background: "white"}}>
            <NavLink to="/profile" style={{ textDecoration: "none" , color: "Black" , fontSize: "1.5rem" , fontStyle: "Bold"}}>profile</NavLink>
          </Dropdown.Item>
      )}
      {!token && (
        <Dropdown.Item style={{background: "white"}}>
        <NavLink to="/login" style={{ textDecoration: "none" , color: "Black" , fontSize: "1.5rem" , fontStyle: "Bold"}}>Login</NavLink>
      </Dropdown.Item>
      )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
