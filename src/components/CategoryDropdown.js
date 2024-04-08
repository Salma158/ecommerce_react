

import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../store/categories/slices/categorySlice";

function CategoryDropdown() {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" style={{ background: "transparent", color: "inherit", border: "none", fontSize: "1.6rem" , textDecoration: "none"}}>
        Categories
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ background: "transparent" }}>
        {categories.map((category) => (
          <Dropdown.Item key={category.id} style={{background: "transperent"}}>
            <NavLink to={`/categories/${category.id}/products`} style={{ textDecoration: "none" , color: "Black" , fontSize: "1.4rem" , fontStyle: "Bold"}}>{category.categoryname}</NavLink>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CategoryDropdown;
