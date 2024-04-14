import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBTypography } from 'mdb-react-ui-kit';
import shippingImage from '../../assets/images/flower_shipping.jpg';
import Button from '../../components/Button';
import { addShippingAddress } from '../../store/shippingDetails/shippingDetails';
import { useDispatch } from 'react-redux';
import { checkout } from '../../store/order/order';

function ShippingForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!formData.first_name.trim()) {
      errors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      errors.last_name = 'Last name is required';
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }
    if (!formData.postalCode.trim()) {
      errors.postalCode = 'Postal Code is required';
    }
    // If there are errors, set them in the state
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      dispatch(addShippingAddress(formData)); 
      dispatch(checkout()); // Dispatch the checkout action

      // Optionally, you can navigate to the payment page here
      // window.location.href = '/payment';
    }
  };

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

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="first_name" className="form-label">First name</label>
                      <MDBInput id="first_name" type="text" className="form-control" size="lg" name="first_name" value={formData.first_name} onChange={handleChange} />
                      {formErrors.first_name && <div className="text-danger">{formErrors.first_name}</div>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="last_name" className="form-label">Last name</label>
                      <MDBInput id="last_name" type="text" className="form-control" size="lg" name="last_name" value={formData.last_name} onChange={handleChange} />
                      {formErrors.last_name && <div className="text-danger">{formErrors.last_name}</div>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="address" className="form-label">Address</label>
                      <MDBInput id="address" type="text" className="form-control" size="lg" name="address" value={formData.address} onChange={handleChange} />
                      {formErrors.address && <div className="text-danger">{formErrors.address}</div>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="city" className="form-label">City</label>
                      <MDBInput id="city" type="text" className="form-control" size="lg" name="city" value={formData.city} onChange={handleChange} />
                      {formErrors.city && <div className="text-danger">{formErrors.city}</div>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="postalCode" className="form-label">Postal Code</label>
                      <MDBInput id="postalCode" type="text" className="form-control" size="lg" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                      {formErrors.postalCode && <div className="text-danger">{formErrors.postalCode}</div>}
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <Button
                        type="submit" // This button will submit the form
                        text="Checkout"
                        width="auto"
                        height="auto"
                        backgroundColor="#000000"
                        color="#ffffff"
                      />
                    </div>
                  </form>
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
