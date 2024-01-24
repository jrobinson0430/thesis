import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Footer } from '../../components';
import Context from '../../utilities/contextProvider/Context';

const ErrorHandler = () => {
  const { messagingBox, navigate } = useContext(Context);
  const { unauthorizedMsg, setUnauthorizedMsg } = messagingBox;
  const {
    errorMsg, responseMsg, href, path,
  } = unauthorizedMsg;
  const sendTo = !path ? '/' : path;
  return (
    <>

      <div className="tanTexture border1 rounded text-center m-5 p-2">
        <h1>{errorMsg || 'Something Went Wrong!'}</h1>
        <h2>{responseMsg}</h2>
        <h4>
          {href}
        </h4>
        <Button
          onClick={() => navigate(`${sendTo}`)}
          variant='dark'
          className="actionBtn"
        >
          {sendTo === '/' ? 'Home' : 'Go Back.'}
        </Button>
      </div>
      <Footer classes="fixed-bottom" />
    </>
  );
};

export default ErrorHandler;
