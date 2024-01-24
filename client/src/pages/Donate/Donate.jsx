import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { v4 } from 'uuid';
import axiosAPI from '../../apis/axios';
import { PageHeading, Footer } from '../../components';
import { DonateForm, ConfirmDonation } from './_component';
import Context from '../../utilities/contextProvider/Context';

const Donate = () => {
  const [formData, setFormData] = useState({ donation: '100' });
  const [validated, setValidated] = useState(false);
  const [toggleForm, setToggleForm] = useState(true);
  const { messagingBox, navigate } = useContext(Context);
  const { setToastMsg, setUnauthorizedMsg } = messagingBox;

  const [footerClass, setFooterClass] = useState((window.innerWidth > 1200)
    ? 'fixed-bottom'
    : '');

  const donateBox = {
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
      formData,
      validated,
    },
    handles: {
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
      handleDonation: async (e) => {
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget;
        if (!form.checkValidity()) return;

        try {
          const confirmationNum = v4().slice(0, 8);
          const updatedFormData = { ...formData, confirmationNum };
          const result = await axiosAPI.createDonation(updatedFormData);
          const { success } = result.data;
          if (success) {
            setFormData(updatedFormData);
            setToggleForm(false);
          }
        } catch (error) {
          setUnauthorizedMsg({
            errorMsg: error.message,
            path: error.response.data.href,
            responseMsg: error.response.data.message,
          });
          navigate('/unauthorized');
        }
      },
    },
  };

  window.onresize = () => setFooterClass((window.innerWidth > 1200)
    ? 'fixed-bottom' : '');

  return (
    <>
      <Container>
        <PageHeading headingText='Become a MillionHair' />
        <Row className="d-flex">
          <Col lg={6}>
            <div className="tanTexture border1 text-center mb-3 p-2 rounded">
              <h1 className="">Who We Are</h1>
              <p style={{ fontSize: '1.175rem' }}>
                Millionhairs Rescue Shelter is a proud member of the Best
                Friends Animal Society, an American nonprofit animal welfare
                organization that spans the nation. We are a place where lost,
                stray, abandonded, or surrendered animals are always cared for.
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="tanTexture border1 text-center mb-3 p-2 rounded">
              <h1 className="">Your Donations Matter</h1>
              <p style={{ fontSize: '1.175rem' }}>
                Your donations keep our doors open. As a non-profit
                organization, we are sustained by donations from people just
                like you. Donations provide medical care, food, housing,
                staffing, and more to ensure quality care to the animals that
                need it the most.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            {toggleForm
              ? <DonateForm donateBox={donateBox} />
              : <ConfirmDonation donateBox={donateBox} />}
          </Col>
        </Row>
      </Container>
      <div style={{ height: '6rem' }} />
      <Footer classes={footerClass} />
    </>
  );
};

export default Donate;
