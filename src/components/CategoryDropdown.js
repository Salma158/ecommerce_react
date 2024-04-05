// import React, { useEffect } from "react";
// import { Dropdown } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCategories } from "../store/categories/slices/categorySlice";
// import "./Header.css"; // Import CSS file for styling

// function CategoryDropdown() {
//   const categories = useSelector((state) => state.categories.categories);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   return (
//     <Dropdown as="span">
//       <Dropdown.Toggle as="span" className="category-toggle">
//         Categories
//       </Dropdown.Toggle>
//       <Dropdown.Menu className="category-menu">
//         {categories.map((category) => (
//           <Dropdown.Item key={category.id} className="category-dropdown-item">
//             <NavLink to={`/categories/${category.id}/products`} className="category-link">{category.categoryname}</NavLink>
//           </Dropdown.Item>
//         ))}
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }

// export default CategoryDropdown;
// CategoryDropdown.js

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
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Categories
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map((category) => (
          <Dropdown.Item key={category.id}>
            <NavLink to={`/categories/${category.id}/products`}>{category.categoryname}</NavLink>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CategoryDropdown;
