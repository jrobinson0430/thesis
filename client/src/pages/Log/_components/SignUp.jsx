import React, { useEffect, useState } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { PageHeading } from "../../../components";

import { v4 } from "uuid";
import { Footer } from "../../../components";

const Signup = ({ logBox }) => {
  const { lookups, state, hooks, handles } = logBox;
  const { formData, navigate, validated } = state;
  const { setFormData, setValidated } = hooks;
  const { handleOnChange, handleCreateAcc } = handles;
  const [footerClass, setFooterClass] = useState(
    window.innerWidth > 575 ? "fixed-bottom" : ""
  );

  window.onresize = () =>
    setFooterClass(window.innerWidth > 575 ? "fixed-bottom" : "");

  useEffect(() => {
    setFormData({});
    setValidated(false);
  }, []);

  return (
    <>
      <Container>
        <PageHeading headingText="MillionHair's Rescue Center" />

        <Row className="mt-5">
          <Col xl={{ span: 8, offset: 2 }}>
            <Form
              noValidate // prevents browsers default validation behavior
              validated={validated}
              className="formStyle border1 shadow1 mt-3 mb-3"
              onSubmit={handleCreateAcc}
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
                    value={formData.firstName || ""}
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
                    value={formData.lastName || ""}
                    className="shadow1"
                    onChange={handleOnChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a last name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  sm={6}
                  className="pb-2"
                  controlId="formEmail"
                >
                  <Form.Label className="mb-0">Email</Form.Label>
                  <Form.Control
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email || ""}
                    className="shadow1"
                    onChange={handleOnChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="pb-2" controlId="formPassword">
                  <Form.Label className="mb-0">Password</Form.Label>
                  <Form.Control
                    required
                    minLength="8"
                    maxLength="20"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password || ""}
                    className="shadow1"
                    onChange={handleOnChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Must be 8-20 characters long.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  sm={6}
                  className="pb-2"
                  controlId="formAddress"
                >
                  <Form.Label className="mb-0">Address</Form.Label>
                  <Form.Control
                    required
                    name="loc-address"
                    type="text"
                    placeholder="1234 Main St"
                    value={formData.location?.address || ""}
                    className="shadow1"
                    onChange={handleOnChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an address.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  sm={6}
                  className="pb-2"
                  controlId="formGridCity"
                >
                  <Form.Label className="mb-0">City</Form.Label>
                  <Form.Control
                    required
                    name="loc-city"
                    type="text"
                    placeholder="City"
                    value={formData.location?.city || ""}
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
                    value={formData.location?.state || ""}
                    className="shadow1"
                    onChange={handleOnChange}
                  >
                    <option value="">Choose...</option>
                    {lookups.stateAbreviations.map((str) => (
                      <option value={str} key={v4()}>
                        {str}
                      </option>
                    ))}
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
                    value={formData.location?.zip || ""}
                    className="shadow1"
                    onChange={handleOnChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a zip code.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <div className="d-flex mt-3 justify-content-between align-items-center">
                <Button
                  type="button"
                  variant="dark"
                  className="actionBtn"
                  onClick={() => navigate("/log/login")}
                >
                  Existing User?
                </Button>
                <Button type="submit" variant="dark" className="actionBtn">
                  Create
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer classes={footerClass} />
    </>
  );
};

export default Signup;
