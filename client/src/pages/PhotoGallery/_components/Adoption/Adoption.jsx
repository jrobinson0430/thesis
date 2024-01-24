import React, { useState, useEffect, useContext } from 'react';
import {
  Container, Card, Row, Col,
} from 'react-bootstrap';
import { PageHeading, Footer } from '../../../../components';
import { AdoptionForm, ConfirmAdoption } from './_components';
import Context from '../../../../utilities/contextProvider/Context';

const Adoption = ({ galleryBox }) => {
  const { state, helpers, hooks } = galleryBox;
  const { toggleForm } = state;
  const { capper } = helpers;
  const { setToggleForm } = hooks;
  const { navigate } = useContext(Context);

  const [footerClass, setFooterClass] = useState((window.innerWidth > 1200)
    ? 'fixed-bottom'
    : '');

  const adoptionAnimal = JSON.parse(sessionStorage.getItem('currentAnimal'));

  const {
    _id,
    name,
    animalType,
    breed,
    photo,
    history,
    age,
  } = adoptionAnimal;

  window.onresize = () => setFooterClass((window.innerWidth > 1200)
    ? 'fixed-bottom'
    : '');

  useEffect(() => {
    setToggleForm(true);
  }, []);

  return (
    <>
      <Container>
        <PageHeading headingText='Adopt Me' />
        <Row>
          <Col md={12} xl={5} className="px-2">
            <Row className="mx-1 mb-3  py-2 tanTexture border1 rounded">
              <Col sm={12}>
                <Card className="border1 tanTexture">
                  <div className="animalType">{capper(animalType)}</div>
                  <Card.Img
                    className='cardImg img-fluid'
                    variant="null"
                    src={`data:${photo.contentType};base64,${photo.data}`}
                  />
                </Card>
              </Col>
              <Col sm={12}>
                <div className=" px-2 text-center">
                  <h2 className="">
                    {name}
                  </h2>
                  <p className="h5 mb-0">
                    is a&nbsp;
                    {age}
                    &nbsp;year old&nbsp;
                    {breed}
                    .
                  </p>
                  <p className="h5">
                    {history}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={12} xl={7}>
            {toggleForm
              ? <AdoptionForm galleryBox={galleryBox} />
              : <ConfirmAdoption galleryBox={galleryBox} />}
          </Col>
        </Row>
      </Container>
      <div style={{ height: '6rem' }} />
      <Footer classes={footerClass} />
    </>
  );
};

export default Adoption;
