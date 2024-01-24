import React, { useEffect, useState } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { PageHeading } from "../../../components";

import { Footer } from "../../../components";

const Login = ({ logBox }) => {
  const { state, hooks, handles } = logBox;
  const { formData, navigate, validated } = state;
  const { setFormData, setValidated } = hooks;
  const { handleOnChange, handleLoginAcc } = handles;

  useEffect(() => {
    setFormData({});
    setValidated(false);
  }, []);

  return (
    <>
      <Container>
        <PageHeading headingText="MillionHair's Rescue Center" />
        <Row
          // style={{height: '80vh'}}
          className="mt-5"
        >
          <Col xl={{ span: 6, offset: 3 }}>
            <Form
              noValidate // prevents browsers default validation behavior
              validated={validated}
              className="formStyle border1 shadow1 mt-3 mb-3"
              onSubmit={handleLoginAcc}
            >
              <h1 className="text-center">Access Your Rescue Account</h1>
              <Row>
                <Form.Group
                  className="pb-2"
                  as={Col}
                  sm={12}
                  controlId="formEmail"
                >
                  <Form.Label className="mb-0">Email</Form.Label>
                  <Form.Control
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="shadow1"
                    value={formData.email || ""}
                    onChange={handleOnChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="pb-2" as={Col} controlId="formPassword">
                  <Form.Label className="mb-0">Password</Form.Label>
                  <Form.Control
                    required
                    minLength="8"
                    maxLength="20"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="shadow1"
                    value={formData.password || ""}
                    onChange={handleOnChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Must be 8-20 characters long.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  type="button"
                  variant="dark"
                  className="actionBtn"
                  onClick={() => navigate("/log/create")}
                >
                  New User?
                </Button>
                <Button type="submit" variant="dark" className="actionBtn">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer classes="fixed-bottom" />
    </>
  );
};

export default Login;
