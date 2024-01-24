import React, { useState, useContext } from 'react';
import {
  Form, Col, Button, Row,
} from 'react-bootstrap';
import { v4 } from 'uuid';

const DonateForm = ({ donateBox }) => {
  const { state, handles, lookups } = donateBox;
  const { formData, validated } = state;
  const { handleOnChange, handleDonation } = handles;

  return (
    <Form
      noValidate // prevents browsers default validation behavior
      validated={validated}
      className="formStyle border1 mb-3 shadow1"
      onSubmit={handleDonation}
    >
      <h1 className="text-center">Make Donation</h1>
      <Row>
        <Form.Group className="pb-2" as={Col} controlId="fullName">
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
            Please provide a full name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="pb-2" as={Col} controlId="email">
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
        <Form.Group className="pb-2" as={Col} md={5} controlId="address">
          <Form.Label className="mb-0">Address</Form.Label>
          <Form.Control
            required
            name="loc-address"
            type="text"
            placeholder="Address"
            className="shadow1"
            value={formData.location?.address || ''}
            onChange={handleOnChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide an address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={3} className="pb-2" controlId="formGridCity">
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

        <Form.Group as={Col} className="pb-2" controlId="formState">
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
              lookups.stateAbreviations.map((str) => (
                <option value={str} key={v4()}>{str}</option>
              ))
            }
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please provide a state.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} className="pb-2" controlId="formZip">
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

        <Form.Group className="pb-2" as={Col} sm={6} controlId="cardNum">
          <Form.Label className="mb-0">Card  Number</Form.Label>
          <Form.Control
            required
            name="cardNum"
            type="text"
            placeholder="0000000000000000"
            className="shadow1"
            value={formData.cardNum || ''}
            onChange={handleOnChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide 16 digit card number.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="pb-2" as={Col} controlId="verificationNum">
          <Form.Label className="mb-0">CSC</Form.Label>
          <Form.Control
            required
            name="verificationNum"
            type="text"
            placeholder="000"
            className="shadow1"
            value={formData.verificationNum || ''}
            onChange={handleOnChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a card security code.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="pb-2" as={Col} controlId="donation">
          <Form.Label className="mb-0">Dontation Amount</Form.Label>
          <Form.Control
            name="donation"
            type="number"
            step="10"
            min="0"
            max='10000'
            placeholder="0"
            className="shadow1"
            value={formData.donation || ''}
            onChange={handleOnChange}
          />
          <Form.Control.Feedback type="invalid">
            Donation amount required.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <div className="d-flex justify-content-end align-items-center mt-3">
        <Button
          type="submit"
          variant="dark"
          className="actionBtn"
        >
          Donate
        </Button>
      </div>
    </Form>
  );
};

export default DonateForm;
