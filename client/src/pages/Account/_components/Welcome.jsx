import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Context from '../../../utilities/contextProvider/Context';

const Welcome = () => {
  const { userData } = useContext(Context);
  const {
    firstName, lastName, email, location,
  } = userData;
  const {
    city, state, zip, address,
  } = location;
  console.log(userData);
  return (
    <Row>
      <Col lg={{ span: 8, offset: 2 }}>
        <div className="tanTexture border1 p-2 rounded text-center mb-3">
          <h1>
            Stay Informed!
          </h1>

          <p className="h4">
            Use the buttons above to track your donation history, adoption
            requests status, and edit your account information.
          </p>
        </div>
      </Col>
      <Col lg={{ span: 8, offset: 2 }}>
        <div
          className="tanTexture text-center p-2 border1 d-flex flex-column rounded mb-3"
        >
          <h1>Account Details</h1>
          <p className="h4">
            Name:&nbsp;
            {firstName}
            {' '}
            {lastName}
          </p>
          <p className="h4">
            Email:&nbsp;
            {email}
          </p>
          <p className="h4">
            Address:&nbsp;
            {address}
            {' '}
            {city}
            ,
            {' '}
            {state}
            {' '}
            {zip}
            {' '}
          </p>
        </div>
      </Col>
    </Row>

  );
};

export default Welcome;
