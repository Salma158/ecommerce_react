// import React, { useState } from "react";
// import { Card } from "react-bootstrap";
// import "./WishlistTableRow.css";
// import { XCircleFill } from "react-bootstrap-icons";
// import { useDispatch } from 'react-redux';
// import { removeFromWishlist } from '../store/wishlists/wishlists';
// import { useEffect } from 'react';


// const WishlistTableRow = ({ product }) => {
  
//   const dispatch = useDispatch();
//   const [isChecked, setIsChecked] = useState(false);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const handleDeleteItem = () => {
//     dispatch(removeFromWishlist(product._id));
//   }

//   return (
//     <tr key={product._id}>
//       <td className="checkbox-cell">
//         <input
//           type="checkbox"
//           checked={isChecked}
//           onChange={handleCheckboxChange}
//         />
//       </td>

//       <td>
//         <img
//           src={product.image}
//           alt={product.productname}
//           className="product-image"
//         />
//       </td>
//       <td>{product.productname}</td>
//       <td>{product.price}</td>
//       <td>{product.stock <= 0 ? "Out of Stock" : "In Stock"}</td>
//       <td>
//         <button onClick={handleDeleteItem}>
//           <XCircleFill size={24} color="gray" className="delete-icon" />
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default WishlistTableRow;
