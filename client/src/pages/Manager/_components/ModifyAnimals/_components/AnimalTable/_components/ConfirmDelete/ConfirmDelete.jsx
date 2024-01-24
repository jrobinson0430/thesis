import React from 'react';
import { Button } from 'react-bootstrap';
import './ConfirmDelete.css';

const ConfirmDelete = ({ managerBox }) => {
  const { state, hooks, handles } = managerBox;
  const { deleteId } = state;
  const { setDeleteId } = hooks;
  const { handleDeleteAnimal } = handles;
  return (
    <div className="confirmDelBox tanTexture border1  shadow1 rounded">
      <p className="h4">Delete Animal?</p>
      <Button
        variant='dark'
        style={{ width: '5rem' }}
        className="actionBtn me-3"
        onClick={(e) => setDeleteId('')}
      >
        No
      </Button>
      <Button
        variant='dark'
        className="actionBtn"
        data-animalid={deleteId}
        onClick={handleDeleteAnimal}
        style={{ backgroundColor: 'red', width: '5rem' }}
      >
        Yes
      </Button>
    </div>
  );
};

export default ConfirmDelete;
