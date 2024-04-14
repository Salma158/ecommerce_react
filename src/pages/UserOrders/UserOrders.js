import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { fetchUserOrders } from '../../store/order/order';
import { Link } from 'react-router-dom'; // Import Link
import './UserOrders.css';
import Button from '../../components/Button';
import orders_frame from '../../assets/images/orders_frame.jpg';

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);
  const loading = useSelector(state => state.order.loading);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <div className="orders-container"> {/* Apply container class */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        orders ? (
          orders.map(order => (
            <MDBCol sm='6' key={order.order_id}>
              <MDBCard className="order-card"> 
  <MDBCardImage src={orders_frame} alt="Sample photo" fluid  style={{ objectFit: 'cover', height: '100px' }}/> {/* Use MDBCardImage with orders_frame image */}
  <MDBCardBody>
    <MDBCardTitle className="order-card-title">Order ID: {order.order_id}</MDBCardTitle>
    <MDBCardText className="order-card-text">
      Order Status: {order.order_status}
    </MDBCardText>
    <MDBCardText className="order-card-text">
      Total Price: {order.total_price} EGP
    </MDBCardText>
    <MDBCardText className="order-card-text">
      Placing Date: {formatDate(order.placing_date)}
    </MDBCardText>
    <div className="d-flex justify-content-end pt-3">
    <Link to={`/order-details/${order.order_id}`}>
                      <Button
                        text="View Details"
                        width="auto"
                        height="auto"
                        backgroundColor="#000000"
                        color="#ffffff"
                      />
                    </Link>
    </div>
  </MDBCardBody>
</MDBCard>

            </MDBCol>
          ))
        ) : (
          <div>No orders available</div>
        )
      )}
    </div>
  );
}
export default Orders;