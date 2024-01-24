import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { v4 } from 'uuid';
import ConfirmDelete from './_components/ConfirmDelete/ConfirmDelete';

const AnimalTable = ({ managerBox, allAnimals }) => {
  const { state, hooks, handles } = managerBox;
  const { deleteId } = state;
  const { setDeleteId } = hooks;
  const { handleDeleteAnimal, handleEditBtn } = handles;

  return (
    <div className='tanTexture border1 rounded mb-3'>
      <h1 className="text-center p-1">Edit/Delete Animals</h1>
      <Table
        responsive
        striped
        bordered
        hover
        className='mb-0 border-dark'
      >
        <thead>
          <tr
            style={{ textDecoration: 'underline' }}
            className="text-center h3"
          >
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>History</th>
            <th>Photo</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {allAnimals.map((obj) => {
            const {
              _id, name, breed, age, history, photo,
            } = obj;

            const blurClass = deleteId === _id ? 'blur' : '';

            return (
              <tr className="text-center h5" key={v4()}>
                <td className={blurClass}>
                  {name}
                </td>
                <td className={blurClass}>{breed}</td>
                <td className={blurClass}>{age}</td>
                <td className={blurClass}>{history}</td>
                <td className={`${blurClass} p-1`}>
                  <img
                    style={{ width: '6rem', height: '6rem' }}
                    className='cardImg rounded'
                    alt="animal"
                    src={`data:${photo.contentType};base64,${photo.data}`}
                  />
                </td>
                <td className="d-flex flex-column">
                  {deleteId === _id
                    && <ConfirmDelete managerBox={managerBox} />}
                  <Button
                    disabled={blurClass || ''}
                    variant="dark"
                    onClick={handleEditBtn}
                    data-animalid={_id}
                    className="actionBtn shadow1 w-100"
                  >
                    Edit
                  </Button>
                  <Button
                    disabled={blurClass || ''}
                    variant="dark"
                    onClick={(e) => setDeleteId(e.target.dataset.animalid)}
                    style={{ backgroundColor: 'red' }}
                    data-animalid={_id}
                    className="actionBtn w-100 shadow1"
                  >
                    Delete
                  </Button>
                </td>
              </tr>

            );
          })}
        </tbody>
      </Table>
    </div>

  );
};

export default AnimalTable;
