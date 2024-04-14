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
import { useParams } from 'react-router-dom'; // Import useParams to get orderId from URL params


const Order = () => { // Accept orderId as a prop
  const { orderId } = useParams(); // Get orderId from URL params
  const dispatch = useDispatch();
  //const orderData = useSelector((state) => state.order); // Assuming your slice is named 'order'
  const { order, order_items, loading, error } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchOrderById(orderId));
    console.log(order_items)
  }, [dispatch, orderId]);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section className="vh-100 gradient-custom-2">
        {order && (
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="10" lg="8" xl="6">
                <MDBCard
                  className="card-stepper"
                  style={{ borderRadius: "16px" }}
                >
                  <MDBCardHeader className="p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-2">
                          {" "}
                          Order ID{" "}
                          <span className="fw-bold text-body">
                            {order.order_id}
                          </span>
                        </p>
                        <p className="text-muted mb-0">
                          {" "}
                          Placed On{" "}
                          <span className="fw-bold text-body">
                            {order.placing_date}
                          </span>{" "}
                        </p>
                      </div>
                      <div>
                        <MDBTypography tag="h6" className="mb-0">
                          <div className="d-flex justify-content-end pt-3">
                            <Button
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
                    {order_items && order_items.data.map((item, index) => (
                      <div className="d-flex flex-row mb-4 pb-2" key={index}>
                        <div className="flex-fill">
                          <MDBTypography tag="h5" className="bold">
                            Product Name: {item.productname}
                          </MDBTypography>
                          <p className="text-muted">
                            Quantity: {item.quantity} item
                          </p>
                          <MDBTypography tag="h4" className="mb-3">
                            {" "}
                            $ {item.price}{" "}
                            {/* <span className="small text-muted">
                              Payment Method: via {order.payment_method}{" "}
                            </span> */}
                          </MDBTypography>
                          {/* <p className="text-muted">
                            Order Status:{" "}
                            <span className="text-body">{order.order_status}</span>
                          </p> */}
                        </div>
                        <div>
                          <MDBCardImage
                            fluid
                            className="align-self-center"
                            src={item.image}
                            alt={item.productname}
                            width="250"
                          />
                        </div>
                      </div>
                    ))}

                    <ul
                      id="progressbar-1"
                      className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4"
                    >
                      <li className="step0 active" id="step1">
                        <span
                          style={{ marginLeft: "22px", marginTop: "12px" }}
                        >
                          PLACED
                        </span>
                      </li>
                      <li className="step0 active text-center" id="step2">
                        <span>SHIPPED</span>
                      </li>
                      <li className="step0 text-muted text-end" id="step3">
                        <span style={{ marginRight: "22px" }}>
                          DELIVERED
                        </span>
                      </li>
                    </ul>
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
