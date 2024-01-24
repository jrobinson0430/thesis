import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Context from '../../../utilities/contextProvider/Context';

const ConfirmDonation = ({ donateBox }) => {
  const { state } = donateBox;
  const { formData } = state;
  const { fullName, confirmationNum } = formData;

  const navigate = useNavigate();
  const { userData } = useContext(Context);

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
          Thank You
          {fullName}
          .
        </h1>
        <p className="h3">
          Your donation has been accepted.
        </p>
        <p className="h5">
          A receipt has been sent to the email you provided us.
        </p>

        {userData.email
          ? (
            <>
              <p className="h5">Check out our photo gallery!</p>
              <Button
                onClick={() => navigate('/photoGallery')}
                variant="dark"
                type="button"
                className="actionBtn "
              >
                Gallery
              </Button>
            </>
          )
          : (
            <>
              <p className="h5">
                Don&apos;t have an MillionHair account yet?
              </p>
              <Button
                onClick={() => navigate('/log/create')}
                variant="dark"
                type="button"
                className="actionBtn "
              >
                Sign Up Here!
              </Button>
            </>
          )}
      </div>
    </>
  );
};

export default ConfirmDonation;
