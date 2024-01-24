import React from 'react';
import { v4 } from 'uuid';
import { Container } from 'react-bootstrap';
import { PageHeading } from '../../../../components';
import './AnimalIcon.css';

const AnimalIcon = ({ galleryBox }) => {
  const { state, handles } = galleryBox;
  const { animalIcons } = state;
  const { handleAnimalIcons } = handles;

  return (
    <Container>
      <PageHeading headingText='Adoption  Gallery' />
      <div className="d-flex flex-wrap justify-content-center w-100">
        {animalIcons.map((obj) => (
          <button
            type="button"
            key={v4()}
            onClick={handleAnimalIcons}
            data-animal={obj.name}
            className={obj.animalClasses.join(' ')}
          >
            {obj.emoji}
          </button>
        ))}
      </div>
    </Container>
  );
};

export default AnimalIcon;
