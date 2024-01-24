import React, { useState, useContext } from 'react';
import {
  Container, Button, Row, Col, Image,
} from 'react-bootstrap';
import { Footer, PageHeading } from '../../components';
import Context from '../../utilities/contextProvider/Context';

const Home = () => {
  const { navigate } = useContext(Context);

  const [footerClass, setFooterClass] = useState(
    window.innerWidth > 1200 ? "fixed-bottom" : ""
  );

  window.onresize = () =>
    setFooterClass(window.innerWidth > 1200 ? "fixed-bottom" : "");

  return (
    <>
      <Container className="text-center">
        <PageHeading headingText='MillionHair&apos;s Rescue Center' />
        <Row>
          <Col md={12} xl={6} className="p-2">
            <div className="tanTexture border1 rounded mb-3 p-2">
              <h2 className="mb-2">Our Mission</h2>
              <p className="h5 mb-0">
                To provide a helping hand to animals in need, a voice to those
                who cannot speak, and an awareness to humane treatment of all
                animals.
              </p>
            </div>
            <Image
              className="img-fluid rounded border1 mb-3"
              src="images/misc/horses.jpg"
            />
          </Col>
          <Col md={12} xl={6} className="p-2">
            <div className="tanTexture border1 rounded mb-3 p-2">
              <h2 className="mb-2">Proud Partners</h2>
              <p className="h5 mb-0">
                MillionHair&apos;s Rescue Centers are the proud partners of The
                Humane Society of the United States, Best Friends Animal
                Society and the Animal Welfare Institute (AWI).
              </p>
            </div>
            <div className="tanTexture border1 rounded mb-3 p-2">
              <h2 className="mb-1">Become a MillionHair!</h2>
              <p className="h5">
                As a non-profit organization, we rely on private donations from
                people just like you! Help us in our mission by giving a gift
                of life to an animal in need and becoming a true MillionHair.
              </p>
              <Button
                type="button"
                variant="dark"
                onClick={() => navigate('/donate')}
                style={{ width: '6rem' }}
                className="actionBtn mb-1"
              >
                Donate
              </Button>
            </div>
            <div className="tanTexture border1 rounded mb-3 p-2">
              <h2 className="mb-1">Adoptions Available</h2>
              <p className="h5">
                Located on a 20 acre farm. We house up to 200 animals including cats, dogs, horses, reptiles, birds, injured wildlife, and more. Come visit us at 3253 MillionHair Drive Lafayette, IN or check out our animal gallery to begin the adoption process today.
              </p>
              <Button
                type="button"
                variant="dark"
                onClick={() => navigate('/photoGallery')}
                style={{ width: '6rem' }}
                className="actionBtn mb-1"
              >
                Animals
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer
      />
    </>
  );
};

export default Home;
