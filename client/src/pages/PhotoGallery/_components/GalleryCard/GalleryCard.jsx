import React, { useContext, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './GalleryCard.css';

const GalleryCard = ({ galleryBox, animal }) => {
  const {
    _id, name, animalType, breed, photo, history, age,
  } = animal;
  const { state, handles, helpers } = galleryBox;
  const { currentAnimal } = state;
  

  const { capper } = helpers;
  const { handleDetailsBtn, handleAdoptBtn } = handles;

  return (
    <Card className="cardStyles tanTexture shadow1 position-relative">
      <Card.Img
        className='cardImg'
        variant="null"
        src={`data:${photo.contentType};base64,${photo.data}`}
      />
      <Card.Body className=" p-0 pt-2 pb-4 px-2">
        <div className="animalType">{capper(animalType)}</div>
        {currentAnimal._id !== _id
          ? (
            <>
              <Card.Header className="text-center mb-2 mt-0 h2">
                {name}
              </Card.Header>
              <p className="text-center h6">
                <span className="h5">Age:&nbsp;</span>
                {age}
              </p>
              <p className="text-center h6">
                <span className="h5">Breed:&nbsp;</span>
                {capper(breed)}
              </p>
            </>
          )
          : (
            <>
              <Card.Header className="text-center mb-2 mt-0 h2">
                Details
              </Card.Header>
              <p className="text-center h5">{history}</p>
            </>
          )}
      </Card.Body>

      <div className="p-1 ">
        <Button
          type="button"
          variant="dark"
          className={`${currentAnimal._id === _id
            ? 'active' : ''} actionBtn shadow1 w-50`}
          onClick={handleDetailsBtn}
          data-id={_id}
        >
          {currentAnimal._id === _id ? 'Back' : 'Details'}
        </Button>
        <Button
          type="button"
          variant="dark"
          className="actionBtn shadow1 w-50"
          onClick={handleAdoptBtn}
          data-id={_id}
        >
          Adopt
        </Button>
      </div>

    </Card>
  );
};

export default GalleryCard;
