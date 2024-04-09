import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBTypography } from 'mdb-react-ui-kit';
import shippingImage from '../../assets/images/flower_shipping.jpg';
import Button from '../../components/Button'

function ShippingForm() {
    return (
      <MDBContainer className="py-5" style={{ maxWidth: '1100px' }}>
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol>
            <MDBCard className="my-4 shadow-3">
              <MDBRow className="g-0">
              <MDBCol md="6" className="d-xl-block bg-image">
                <MDBCardImage src={shippingImage} alt="Sample photo" fluid />
                </MDBCol>
                <MDBCol md="6">
                  <MDBCardBody className="p-md-5 text-black">
                    <MDBTypography tag="h3" className="mb-4 text-uppercase">Shipping Address</MDBTypography>
  
                    <div className="mb-4">
                      <label htmlFor="firstName" className="form-label">First name</label>
                      <MDBInput id="firstName" type="text" className="form-control" size="lg" />
                    </div>
  
                    <div className="mb-4">
                      <label htmlFor="lastName" className="form-label">Last name</label>
                      <MDBInput id="lastName" type="text" className="form-control" size="lg" />
                    </div>
  
                    <div className="mb-4">
                      <label htmlFor="address" className="form-label">Address</label>
                      <MDBInput id="address" type="text" className="form-control" size="lg" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="city" className="form-label">City</label>
                      <MDBInput id="city" type="text" className="form-control" size="lg" />
                    </div>
  
                    <div className="mb-4">
                      <label htmlFor="zip" className="form-label">Postal Code</label>
                      <MDBInput id="zip" type="text" className="form-control" size="lg" />
                    </div> 
                    <div className="d-flex justify-content-end pt-3">
                        <Button onClick={undefined}
                        text="Next"
                        width="auto"
                        height="auto"
                        backgroundColor="#000000" // Soft pink color (you can adjust this)
                        color="#ffffff"
                        />
                    </div>
  
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );

  }

  
  export default ShippingForm;