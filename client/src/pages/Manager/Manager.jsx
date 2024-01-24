import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { PageHeading } from '../../components';
import Context from '../../utilities/contextProvider/Context';
import axiosAPI from '../../apis/axios';
import {
  CreatePetForm,
  ManagerBtns,
  DonationHistory,
  ModifyAnimals,
  AdoptionRequests,
} from './_components';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

const Manager = ({ allAnimals, setAllAnimals }) => {
  const {
    userData,
    messagingBox,
    navigate,
    location,
  } = useContext(Context);
  const { setUnauthorizedMsg } = messagingBox;
  const [allDonations, setAllDonations] = useState([]);
  const [allAdoptions, setAllAdoptions] = useState([]);
  const [editId, setEditId] = useState('');
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const checkManagerAuth = async () => {
    try {
      const result = await axiosAPI
        .hasStoreManagerAccess({ isPageCheck: true });
      const { success, message, href } = result.data;
      if (!success) {
        setUnauthorizedMsg({
          errorMsg: 'Access Denied',
          path: href,
          responseMsg: message,
        });
        navigate('/unauthorized');
      }
    } catch (error) {
      setUnauthorizedMsg({
        errorMsg: error.message,
        href: error.response.data.href,
        path: '/',
        responseMsg: error.response.data.message,
      });
      navigate('/unauthorized');
    }
  };

  useEffect(() => {
    checkManagerAuth();
  }, []);

  const managerBox = {
    lookups: {
      animalTypes: ['dog', 'cat', 'bird', 'reptile', 'horse'],
    },
    state: {
      formData,
      validated,
      allDonations,
      allAdoptions,
      editId,
      deleteId,
    },
    hooks: {
      setFormData,
      setValidated,
      setAllDonations,
      setAllAdoptions,
      setEditId,
      setDeleteId,
    },

    handles: {
      handleOnChange(e) {
        const { name } = e.target;
        const locationName = e.target.name.split('-').at(1);
        const { value } = e.target;

        setFormData(name === 'photo'
          ? { ...formData, [name]: e.target.files[0] }
          : { ...formData, [name]: value });
      },
      handleAddAnimal: async (e) => {
        e.preventDefault();

        // form validation
        setValidated(true);
        const form = e.currentTarget;
        if (!form.checkValidity()) return;
        let allFormData = { ...formData };

        // this only adds the photo prop only if manager uploaded a file
        // must have allFormData bc of scoping issues.
        if (e.target.photo.files[0]) {
          setFormData({ ...formData, photo: e.target.photo.files[0] });
          allFormData = { ...formData, photo: e.target.photo.files[0] };
        }

        try {
          // created for use by formidible on server-side
          const formattedData = new FormData();
          for (const entry of Object.entries(allFormData)) {
            formattedData.append(entry[0], entry[1]);
          }

          const result = await axiosAPI.addNewAnimal(formattedData);

          const { success } = result.data;
          if (success) {
            navigate('/manager/editAnimals');
            setFormData({});
            setValidated(false);
          }
        } catch (error) {
          setUnauthorizedMsg({
            errorMsg: error.message,
            path: location.pathname,
            responseMsg: error.response.data.message,
          });
          navigate('/unauthorized');
        }
      },
      handleDeleteAnimal: async (e) => {
        try {
          const targetId = e.target.dataset.animalid;
          const result = await axiosAPI.deleteAnimal(targetId);
          const { success } = result.data;

          if (success) {
            const updatedAnimals = allAnimals
              .filter((animal) => animal._id !== targetId);
            setAllAnimals(updatedAnimals);
            setDeleteId('');
          }
        } catch (error) {
          setUnauthorizedMsg({
            errorMsg: error.message,
            path: location.pathname,
            responseMsg: error.response.data.message,
          });
          navigate('/unauthorized');
        }
      },
      handleEditBtn(e) {
        const targetId = e.target.dataset.animalid;
        const [editAnimal] = allAnimals
          .filter((animal) => animal._id === targetId);

        setFormData(editAnimal);
        setEditId(targetId);
      },

      handleUpdateAnimal: async (e) => {
        e.preventDefault();

        // form validation
        setValidated(true);
        const form = e.currentTarget;
        if (!form.checkValidity()) return;

        let allFormData = { ...formData };
        if (e.target.photo.files[0]) {
          setFormData({ ...formData, photo: e.target.photo.files[0] });
          allFormData = { ...formData, photo: e.target.photo.files[0] };
        }

        try {
          // created for use by formidible on server-side
          const formattedData = new FormData();
          for (const entry of Object.entries(allFormData)) {
            formattedData.append(entry[0], entry[1]);
          }

          const result = await axiosAPI.updateAnimal(formattedData, editId);
          const { success, updatedAnimal } = result.data;

          if (success) {
            const filteredAnimals = allAnimals
              .filter((animal) => animal._id !== editId);

            const updatedAnimals = [...filteredAnimals, updatedAnimal]
              .sort((a, b) => ((a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0));
            setAllAnimals(updatedAnimals);
            setEditId('');
          }
        } catch (error) {
          setUnauthorizedMsg({
            errorMsg: error.message,
            path: location.pathname,
            responseMsg: error.response.data.message,
          });
          navigate('/unauthorized');
        }
      },
      handleStatusChange: async (e) => {
        try {
          const targetId = e.target.dataset.adoptionid;
          const [selectedDoc] = allAdoptions
            .filter((adoption) => adoption._id === targetId);

          const { status } = selectedDoc;
          const newStatus = status === 'pending' ? 'closed' : 'pending';
          const newDoc = { ...selectedDoc, status: newStatus };
          const result = await axiosAPI.updateAdoptionStatus(newDoc, targetId);
          const { success, updatedDoc } = result.data;

          if (success) {
            const filteredAdoptions = allAdoptions
              .filter((adoption) => adoption._id !== targetId);

            const updatedAdoptions = [...filteredAdoptions, updatedDoc]
              .sort((a, b) => ((a.status > b.status)
                ? -1 : (a.status < b.status) ? 1 : 0));
            setAllAdoptions(updatedAdoptions);
          }
        } catch (error) {
          setUnauthorizedMsg({
            errorMsg: error.message,
            path: location.pathname,
            responseMsg: error.response.data.message,
          });
        }
      },
    },
  };

  return (
    <Container fluid>
      <PageHeading headingText='Managers Page' />
      <Routes>
        <Route
          path="/"
          element={<ManagerBtns managerBox={managerBox} />}
        />

        <Route
          path="/addAnimal"
          element={(
            <>
              <ManagerBtns managerBox={managerBox} />
              <CreatePetForm managerBox={managerBox} />
            </>
          )}
        />
        <Route
          path="/editAnimals"
          element={(
            <>
              <ManagerBtns managerBox={managerBox} />
              <ModifyAnimals
                allAnimals={allAnimals}
                setAllAnimals={setAllAnimals}
                managerBox={managerBox}
              />
            </>
          )}
        />
        <Route
          path="/donationHistory"
          element={(
            <>
              <ManagerBtns managerBox={managerBox} />
              <DonationHistory managerBox={managerBox} />
            </>
          )}
        />
        <Route
          path="/adoptionRequests"
          element={(
            <>
              <ManagerBtns managerBox={managerBox} />
              <AdoptionRequests managerBox={managerBox} />
            </>
          )}
        />
        <Route
          path="*"
          element={<ErrorHandler />}
        />
      </Routes>
    </Container>
  );
};

export default Manager;
