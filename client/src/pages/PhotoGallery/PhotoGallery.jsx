import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { v4 } from 'uuid';
import { Adoption, AnimalIcon } from './_components';
import GalleryCard from './_components/GalleryCard/GalleryCard';
import axiosAPI from '../../apis/axios';
import Context from '../../utilities/contextProvider/Context';

import { Footer } from '../../components';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

const PhotoGallery = ({ allAnimals, setAllAnimals }) => {
  const [searchArr, setSearchArr] = useState([]);
  const [currentAnimal, setCurrentAnimal] = useState({});
  const [formData, setFormData] = useState('');
  const [validated, setValidated] = useState(false);
  const [toggleForm, setToggleForm] = useState(true);
  const [animalIcons, setAnimalIcons] = useState(createAnimalIcons());
  const { messagingBox, navigate, location } = useContext(Context);
  const { setUnauthorizedMsg } = messagingBox;

  const getAnimals = async () => {
    try {
      const result = await axiosAPI.getAnimals();
      const { success, data } = result.data;
      if (success) {
        setAllAnimals(data);
        setSearchArr(data);
      }
    } catch (error) {
      setUnauthorizedMsg({
        errorMsg: error.message,
        path: location.pathname,
        responseMsg: error.response.data.message,
      });
    }
  };

  const updateSearchParams = (animalsArr) => {
    const filteredAnimals = animalsArr.filter((obj) => obj.animalClasses.includes('animalSelected')).map((animal) => animal.name);

    const newSearchArr = allAnimals.filter((animal) => filteredAnimals
      .includes(animal.animalType));

    setSearchArr(filteredAnimals.length ? newSearchArr : allAnimals);
  };

  // used to set initial state
  function createAnimalIcons() {
    const animalIconsLookup = ['🐈', '🐕', '🦎', '🐎', '🦜'];
    const animalNames = ['cat', 'dog', 'reptile', 'horse', 'bird'];

    return animalIconsLookup.map((emoji, idx) => (
      {
        order: idx,
        emoji,
        name: animalNames.at(idx),
        animalClasses: ['animalIcon', 'shadow1'],
      }
    ));
  }

  const galleryBox = {
    lookups: {
      stateAbreviations: [
        'AL', 'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
        'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
        'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
        'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
        'WI', 'WY',
      ],
    },
    state: {
      allAnimals,
      currentAnimal,
      animalIcons,
      searchArr,
      formData,
      validated,
      toggleForm,
    },
    hooks: {
      setCurrentAnimal,
      setFormData,
      setValidated,
      setToggleForm,
    },
    helpers: {
      capper(str) {
        return str.at(0).toUpperCase() + str.slice(1);
      },
      resetAnimalIcons() {
        setAnimalIcons(createAnimalIcons());
      },
    },
    handles: {
      handleDetailsBtn(e) {
        const targetId = e.target.dataset.id;
        console.log(targetId)
        const [animalObj] = allAnimals
          .filter((animal) => animal._id === targetId);

        setCurrentAnimal((targetId === currentAnimal._id)
          ? {}
          : animalObj);
      },
      handleAdoptBtn(e) {
        const targetId = e.target.dataset.id;
        const [animalObj] = allAnimals
          .filter((animal) => animal._id === targetId);
        setCurrentAnimal(animalObj);
        sessionStorage.setItem('currentAnimal', JSON.stringify(animalObj));

        navigate('/photoGallery/adopt');
      },
      handleAnimalIcons(e) {
        const target = e.target.dataset.animal;
        const [selectedAnimal] = animalIcons.filter((obj) => obj.name === target);
        const remainingAnimals = animalIcons.filter((obj) => obj.name !== target);

        const { animalClasses } = selectedAnimal;

        const updatedClasses = animalClasses.includes('animalSelected')
          ? ['animalIcon', 'shadow1']
          : ['animalIcon', 'shadow1', 'animalSelected'];

        const updatedAnimal = {
          ...selectedAnimal,
          animalClasses: updatedClasses,
        };

        const updatedAnimalIcons = [
          ...remainingAnimals,
          updatedAnimal,
        ].sort((a, b) => (a.order > b.order ? 1 : -1));

        setAnimalIcons(updatedAnimalIcons);
        return updateSearchParams(updatedAnimalIcons);
      },
      handleOnChange(e) {
        const { name } = e.target;
        const locationName = e.target.name.split('-').at(1);
        const { value } = e.target;
        setFormData(name.includes('loc')
          ? {
            ...formData,
            location: {
              ...formData.location,
              [locationName]: value,
            },
          }
          : { ...formData, [name]: value });
      },
      handleAdoptionSubmit: async (e) => {
        e.preventDefault();

        // form validation
        setValidated(true);
        const form = e.currentTarget;
        if (!form.checkValidity()) return;

        try {
          const confirmationNum = v4().slice(0, 8);
          const { phoneNum } = formData;
          const formattedPhoneNum = phoneNum.match(/[0-9]/gi).join('');
          const updatedFormData = {
            ...formData,
            confirmationNum,
            animalName: currentAnimal.name,
            animalId: currentAnimal._id,
            phoneNum: formattedPhoneNum,
          };
          setToggleForm(false);
          setFormData(updatedFormData);
          const result = await axiosAPI.createAdoption(updatedFormData);
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

  useEffect(() => {
    getAnimals();
    return setAnimalIcons(createAnimalIcons());
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <>
            <AnimalIcon galleryBox={galleryBox} />
            <Container>
              <div className="d-flex flex-wrap justify-content-center">
                {allAnimals.length
                  ? (
                    <>
                      {searchArr.map((animal) => console.log(animal) || (
                        <GalleryCard
                          key={v4()}
                          animal={animal}
                          galleryBox={galleryBox}
                        />
                      ))}
                    </>
                  )
                  : <h3>No animals available at this time.</h3>}
              </div>
            </Container>
            <Footer className="fixed-bottom" />
          </>
        )}
      />
      <Route
        path="/adopt"
        element={(
          <Adoption
            galleryBox={galleryBox}
          />
        )}
      />
      <Route
        path="*"
        element={<ErrorHandler />}
      />
    </Routes>
  );
};

export default PhotoGallery;
