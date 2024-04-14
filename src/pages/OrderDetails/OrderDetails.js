import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from '../../store/order/order';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./OrderDetails.css";
import Button from "../../components/Button";
import { useParams } from 'react-router-dom'; 
import { cancelOrder } from "../../store/order/order";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}


const Order = () => { 
  const { orderId } = useParams(); 
  const dispatch = useDispatch();
  const { order, order_items , loading, error } = useSelector((state) => state.order.order);
  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  const handleCancelOrder = () => {
    dispatch(cancelOrder(orderId)); // Dispatch cancelOrder action with orderId
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#f4f6f3", marginBottom: "300px" }}>
        {order && (
          <MDBContainer className="py-5 h-100 mb-5" style={{ marginBottom: '20px' }}>

            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="10" lg="8" xl="6">
                <MDBCard
                  className="card-stepper"
                  style={{ borderRadius: "16px"}}
                >
                  <MDBCardHeader className="p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-2">
                          {" "}
                          Order ID:{" "}
                          <span className="fw-bold text-body">
                            {order.order_id}
                          </span>
                        </p>
                        <p className="text-muted mb-0">
                          {" "}
                          Placed On:{" "}
                          <span className="fw-bold text-body">
                            {formatDate(order.placing_date)}
                          </span>{" "}
                        </p>
                        <p className="text-muted mb-2">
                          {" "}
                          Order Status:{" "}
                          <span className="fw-bold text-body">
                            {order.order_status}
                          </span>
                        </p>
                        <p className="text-muted mb-2">
                          {" "}
                          Shipping Status:{" "}
                          <span className="fw-bold text-body">
                            {order.shipping_status}
                          </span>
                        </p>
                        {/* <p className="text-muted mb-2">
                          {" "}
                          Shipping Address:{" "}
                          <span className="fw-bold text-body">
                            {order.shipping_address.address}
                          </span>
                        </p> */}
                        <MDBTypography tag="h5" className="bold">
                        Expected Delivery Date: {formatDate(order.delivery_date)} {/* Assuming productname is available in order_items */}
                          </MDBTypography>
                      </div>
                      <div>
                        <MDBTypography tag="h6" className="mb-0">
                          <div className="d-flex justify-content-end pt-3">
                            <Button
                            onClick={handleCancelOrder}
                              text="Cancel"
                              width="auto"
                              height="auto"
                              backgroundColor="#000000"
                              color="#ffffff"
                            />
                          </div>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCardHeader>
                  <MDBCardBody className="p-4">
                    {order_items && order_items.map((item, index) => (
                      <div className="d-flex flex-row mb-4 pb-2" key={index}>
                        <div className="flex-fill">
                          <MDBTypography tag="h5" className="bold">
                            {item.product.productname} {/* Assuming productname is available in order_items */}
                          </MDBTypography>
                          
                          <p className="text-muted">
                            Quantity: {item.quantity} item
                          </p>
                          <MDBTypography tag="h4" className="mb-3">
                            {" "}
                            EGP {item.price}{" "}
                          </MDBTypography>
                        </div>
                        <div>
                          <MDBCardImage
                            fluid
                            className="align-self-center"
                            src={item.product.image} // Assuming image URL is available in order_items
                            alt={item.productname}
                            width="250"
                          />
                        </div>
                      </div>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
      </section>
    </>
  );
};

export default Order;
