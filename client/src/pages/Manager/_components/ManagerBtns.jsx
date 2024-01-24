import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../../utilities/contextProvider/Context';

const ManagerBtns = ({ managerBox }) => {
  const { hooks } = managerBox;
  const { setEditId } = hooks;
  const { navigate, location } = useContext(Context);

  // helper FN to toggle an active class
  const isActive = (path) => location.pathname.includes(path);
  const btnClasses = 'actionBtn shadow1';
  const activeClasses = 'active actionBtn shadow1';

  const handleEditBtn = () => {
    setEditId('');
    navigate('/manager/editAnimals');
  };

  return (
    <div className="d-flex justify-content-evenly mb-4">
      <Button
        type="button"
        variant="dark"
        onClick={handleEditBtn}
        className={`${isActive('edit') ? activeClasses : btnClasses}`}
      >
        Edit/Delete Animals
      </Button>
      <Button
        type="button"
        variant="dark"
        onClick={() => navigate('/manager/addAnimal')}
        className={`${isActive('add') ? activeClasses : btnClasses}`}
      >
        Add Animal
      </Button>
      <Button
        type="button"
        variant="dark"
        onClick={() => navigate('/manager/adoptionRequests')}
        className={`${isActive('adopt') ? activeClasses : btnClasses}`}
      >
        Adoption Requests
      </Button>
      <Button
        type="button"
        variant="dark"
        onClick={() => navigate('/manager/donationHistory')}
        className={`${isActive('donation') ? activeClasses : btnClasses}`}
      >
        Donation History
      </Button>
    </div>
  );
};

export default ManagerBtns;
