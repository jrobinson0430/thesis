import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import axiosAPI from '../../apis/axios';
import { PageHeading, Footer } from '../../components';
import Context from '../../utilities/contextProvider/Context';
import {
  AccountBtns,
  UserDonations,
  UserAdoptions,
  UpdateAcc,
  Welcome,
} from './_components';

const Account = () => {
  const [validated, setValidated] = useState(false);
  const {
    userData,
    messagingBox,
    navigate,
    dispatchUser,
  } = useContext(Context);
  const [formData, setFormData] = useState({});

  const { setUnauthorizedMsg, setToastMsg } = messagingBox;

  const checkUserAuth = async () => {
    try {
      const result = await axiosAPI
        .hasUserAccess({ isPageCheck: true });
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

  const accountBox = {
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
      validated,
      formData,
      userData,
    },

    hooks: {
      setValidated,
      setFormData,
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
      handleUpdateAcc: async (e) => {
        e.preventDefault();

        // form validation
        setValidated(true);
        const form = e.currentTarget;
        if (!form.checkValidity()) return;

        const result = await axiosAPI.updateUser(formData);
        console.log('result', result.data);
        const { success, message, account } = result.data;

        if (success) {
          setToastMsg(message);
          setTimeout(() => {
            dispatchUser({
              type: 'overwrite',
              payload: account,
            });
            navigate('/account');
          }, 2400);
        } else {
          setToastMsg(message);
          setFormData({ ...formData, password: '' });
        }

        // console.log('formData', formData)
      },
    },
  };

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <>
      <Container>
        <PageHeading headingText='Account Page' />
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <AccountBtns />
                <Welcome accountBox={accountBox} />
              </>
            )}
          />

          <Route
            path="/editAccount"
            element={(
              <>
                <AccountBtns />
                <UpdateAcc accountBox={accountBox} />
              </>
            )}
          />
          <Route
            path="/adoptionRequests"
            element={(
              <>
                <AccountBtns />
                <UserAdoptions accountBox={accountBox} />
              </>
            )}
          />
          <Route
            path="/donationHistory"
            element={(
              <>
                <AccountBtns />
                <UserDonations />
              </>
            )}
          />

        </Routes>

      </Container>
      <div style={{ height: '6rem' }} />
      <Footer
        classes='fixed-bottom'
      />

    </>
  );
};

export default Account;
