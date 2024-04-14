// import React, { useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import { checkout } from '../../store/order/order';
// import './Payment.css';

// const Payment = () =>{
//     const dispatch = useDispatch();

//     const handleCheckout = (event) => {
//         event.preventDefault();
//         dispatch(checkout());
//     };

//     useEffect(() => {
//         // Your existing code for handling redirects
//     }, []);

//     return(
//         <section>
//             <form onSubmit={handleCheckout}>
//                 <button className="checkout-button" type="submit">
//                     Checkout
//                 </button>
//             </form>
//         </section>
//     );
// };

// export default Payment;
