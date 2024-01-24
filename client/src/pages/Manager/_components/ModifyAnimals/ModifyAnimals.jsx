import React, { useEffect, useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { v4 } from 'uuid';
import axiosAPI from '../../../../apis/axios';
import Context from '../../../../utilities/contextProvider/Context';
import { AnimalTable, EditAnimal } from './_components';

const ModifyAnimals = ({ managerBox, allAnimals, setAllAnimals }) => {
  const { state } = managerBox;
  const { editId } = state;
  const { messagingBox, location } = useContext(Context);
  const { setUnauthorizedMsg } = messagingBox;

  const getAnimals = async () => {
    try {
      const result = await axiosAPI.getAnimals();
      const { success, data } = result.data;
      if (success) { setAllAnimals(data); }
    } catch (error) {
      setUnauthorizedMsg({
        errorMsg: error.message,
        path: location.pathname,
        responseMsg: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);

  return (
    <>
      {editId.length
        ? (
          <EditAnimal
            managerBox={managerBox}
          />
        )
        : (
          <AnimalTable
            managerBox={managerBox}
            allAnimals={allAnimals}
          />
        )}
    </>
  );
};

export default ModifyAnimals;
