import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Form, Col, Button, Row,
} from 'react-bootstrap';
import { v4 } from 'uuid';
import { Footer } from '../../../components';

const UpdateAcc = ({ accountBox }) => {
  const {
    lookups, state, hooks, handles,
  } = accountBox;
  const { validated, formData, userData } = state;
  const { setFormData, setValidated } = hooks;
  const { handleOnChange, handleUpdateAcc } = handles;

  useEffect(() => () => {
    setFormData(userData);
    setValidated(false);
  }, []);

  return (
    <Container>

      <Form
        noValidate // prevents browsers default validation behavior
        validated={validated}
        className="formStyle border1 shadow1 mt-3 mb-3"
        onSubmit={handleUpdateAcc}
      >
        <h1 className="text-center">Create Rescue Account</h1>
        <Row>
          <Form.Group as={Col} className="pb-2" controlId="formFirstName">
            <Form.Label className="mb-0">First Name</Form.Label>
            <Form.Control
              required
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName || ''}
              className="shadow1"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="pb-2" controlId="formLastName">
            <Form.Label className="mb-0">Last Name</Form.Label>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName || ''}
              className="shadow1"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} sm={6} className="pb-2" controlId="formEmail">
            <Form.Label className="mb-0">Existing Password</Form.Label>
            <Form.Control
              required
              minLength="8"
              maxLength="20"
              name="password"
              type="password"
              placeholder="Old Password"
              value={formData.password || ''}
              className="shadow1"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Must be 8-20 characters long.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="pb-2" controlId="formNewPassword">
            <Form.Label className="mb-0">New Password</Form.Label>
            <Form.Control
              minLength="8"
              maxLength="20"
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={formData.newPassword || ''}
              className="shadow1"
              onChange={handleOnChange}
            />
            <Form.Text>Only if you want to update your password.</Form.Text>
            <Form.Control.Feedback type="invalid">
              Must be 8-20 characters long.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} sm={6} className="pb-2" controlId="formAddress">
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
          <Form.Group as={Col} sm={6} className="pb-2" controlId="formGridCity">
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
        </Row>
        <Row>

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
        <div className="d-flex mt-3 justify-content-end align-items-center">
          <Button
            type="submit"
            variant="dark"
            className="actionBtn"
          >
            Update
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateAcc;
