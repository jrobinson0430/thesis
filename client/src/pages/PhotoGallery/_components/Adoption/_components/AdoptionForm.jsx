import React, { useEffect, useContext } from 'react';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { v4 } from 'uuid';
import Context from '../../../../../utilities/contextProvider/Context';

const AdoptionForm = ({ galleryBox }) => {
  const {
    lookups, state, hooks, handles,
  } = galleryBox;
  const { formData, validated } = state;
  const { setCurrentAnimal, setFormData, setValidated } = hooks;
  const { handleOnChange, handleAdoptionSubmit } = handles;
  const { navigate } = useContext(Context);

  useEffect(() => {
    setFormData({});
    setValidated(false);
    return () => setCurrentAnimal('');
  }, []);

  return (
    <>
      <div className="tanTexture border1 rounded text-center mb-3 p-2">
        <p className="h5">
          To begin the adoption process, please fill out the form below. You
          will receive a confirmation number and be contacted by a MillionHairs
          representative within 3 business days.
        </p>
      </div>
      <Form
        noValidate // prevents browsers default validation behavior
        validated={validated}
        className="formStyle border1 shadow1 mb-3 position-relative"
        onSubmit={handleAdoptionSubmit}
      >
        <h1 className="text-center">Request Adoption</h1>

        <Row>
          <Form.Group className="pb-1" as={Col} controlId="fullName">
            <Form.Label className="mb-0">Full Name</Form.Label>
            <Form.Control
              required
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="shadow1"
              value={formData.fullName || ''}
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide your full name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="pb-1" as={Col} controlId="email">
            <Form.Label className="mb-0">Email</Form.Label>
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="Email"
              className="shadow1"
              value={formData.email || ''}
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} sm={6} className="pb-1" controlId="formAddress">
            <Form.Label className="mb-0">Address</Form.Label>
            <Form.Control
              required
              name="loc-address"
              type="text"
              placeholder="1234 Main St"
              value={formData.location?.address || ''}
              className="shadow1"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide an address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm={6} className="pb-1" controlId="formPhoneNum">
            <Form.Label className="mb-0">Phone Number</Form.Label>
            <Form.Control
              required
              name="phoneNum"
              type="text"
              placeholder="555-555-5555"
              value={formData.phoneNum || ''}
              className="shadow1"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a phone number
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} sm={6} className="pb-1" controlId="formGridCity">
            <Form.Label className="mb-0">City</Form.Label>
            <Form.Control
              required
              name="loc-city"
              type="text"
              placeholder="City"
              value={formData.location?.city || ''}
              className="shadow1"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="pb-1" controlId="formState">
            <Form.Label className="mb-0">State</Form.Label>
            <Form.Control
              required
              name="loc-state"
              as="select"
              value={formData.location?.state || ''}
              className="shadow1"
              onChange={handleOnChange}
            >
              <option value=''>Choose...</option>
              {
                lookups.stateAbreviations.map((stateStr) => (
                  <option value={stateStr} key={v4()}>{stateStr}</option>
                ))
              }
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide a state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="pb-1" controlId="formZip">
            <Form.Label className="mb-0">Zip</Form.Label>
            <Form.Control
              name="loc-zip"
              required
              minLength="5"
              type="text"
              placeholder="Zip"
              value={formData.location?.zip || ''}
              className="shadow1"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a zip code.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Additional Comments/Concerns</Form.Label>
            <Form.Control
              className="shadow1"
              name="comments"
              value={formData.comments || ''}
              onChange={handleOnChange}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Row>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button
          // style={{ left: '0.3rem'}}
            className="actionBtn d-flex align-items-center mt-1"
            variant="dark"
            onClick={() => navigate('/photoGallery')}
          >
            <i className="fa fa-fw" aria-hidden="true"></i>
            Back
          </Button>
          <Button
            type="submit"
            variant="dark"
            className="actionBtn"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AdoptionForm;
