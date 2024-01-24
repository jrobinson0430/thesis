import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../../utilities/contextProvider/Context';

const AccountBtns = () => {
  const { navigate, location } = useContext(Context);

  // helper FN to toggle an active class
  const isActive = (path) => location.pathname.includes(path);

  const btnClasses = 'actionBtn shadow1 mx-lg-5 mx-1 mb-lg-3 mb-2';
  const activeClasses = 'active actionBtn shadow1 mx-lg-5 mx-1 mb-lg-3 mb-2';

  const handleEditAccBtn = (e) => {
    const currPath = location.pathname.includes('edit');
    navigate(currPath ? '/account' : '/account/editAccount');
  };

  const handleAdoptionBtn = (e) => {
    const currPath = location.pathname.includes('adoption');
    navigate(currPath ? '/account' : '/account/adoptionRequests');
  };

  const handleDonationBtn = (e) => {
    const currPath = location.pathname.includes('donation');
    navigate(currPath ? '/account' : '/account/donationHistory');
  };

  return (
    <div className="d-flex justify-content-center flex-wrap mb-4">
      <Button
        type="button"
        variant="dark"
        onClick={handleEditAccBtn}
        style={{ minWidth: '12rem' }}
        className={`${isActive('edit') ? activeClasses : btnClasses}`}
      >
        Edit Account
      </Button>
      <Button
        type="button"
        variant="dark"
        onClick={handleAdoptionBtn}
        style={{ minWidth: '12rem' }}
        className={`${isActive('adopt') ? activeClasses : btnClasses}`}
      >
        Adoption Requests
      </Button>
      <Button
        type="button"
        variant="dark"
        onClick={handleDonationBtn}
        style={{ minWidth: '12rem' }}
        className={`${isActive('donation') ? activeClasses : btnClasses}`}
      >
        Donation History
      </Button>
    </div>
  );
};

export default AccountBtns;
