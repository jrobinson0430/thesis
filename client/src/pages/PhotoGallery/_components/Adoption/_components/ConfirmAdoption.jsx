import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';

import Context from '../../../../../utilities/contextProvider/Context';

const ConfirmAdoption = ({ galleryBox }) => {
  const { state } = galleryBox;
  const { formData } = state;
  const { fullName, confirmationNum } = formData;
  const { userData, navigate } = useContext(Context);
  console.log('formData', formData);
  return (
    <>
      <div className="tanTexture border1 rounded text-center mb-3 p-3">
        <p className="h1">
          Confirmation Number:&nbsp;
          <em className="text-primary h2">{confirmationNum}</em>
        </p>
      </div>
      <div className="tanTexture border1 rounded text-center mb-3 p-3">
        <h1>
          Thank You&nbsp;
          {fullName}
          .
        </h1>
        <p className="h4">
          Your adoption request has been received. A MillionHair&apos;s
          representative will contact you within 3 business days.
        </p>
      </div>
      <div
        className="tanTexture border1 rounded mb-3 p-3 d-flex align-items-center flex-column"
      >

        {userData.email
          ? (
            <>
              <p className="h3">Not a MillionHair?</p>
              <p className="h5">
                Head over to our donor page to make a donation today!
              </p>

              <Button
                onClick={() => navigate('/donate')}
                variant="dark"
                type="button"
                className="actionBtn mt-2"
              >
                Donate!
              </Button>
            </>
          )
          : (
            <>
              <p className="h3">Don&apos;t have an MillionHair account </p>
              <p className="h5">
                Head over to our sign up page and create an account today!
              </p>
              <Button
                onClick={() => navigate('/log/create')}
                variant="dark"
                type="button"
                className="actionBtn mt-2"
              >
                Sign Up Here!
              </Button>
            </>
          )}
      </div>
    </>
  );
};

export default ConfirmAdoption;
