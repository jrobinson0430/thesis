import React, { useState, useContext, useEffect } from 'react';
import axiosAPI from '../../apis/axios';
import NavBar from './_components/NavBar/NavBar';
import Context from '../../utilities/contextProvider/Context';

const Navigation = () => {
  const [showUserLinks, setShowUserLinks] = useState(false);
  const [showManagerLink, setShowManagerLink] = useState(false);
  const {
    userData,
    dispatchUser,
    messagingBox,
    navigate,
    location,
  } = useContext(Context);

  const { setUnauthorizedMsg } = messagingBox;
  const { setToastMsg } = messagingBox;

  const checkUserAuth = async () => {
    try {
      const result = await axiosAPI
        .hasUserAccess({ navCheck: true });

      const { showNav } = result.data;
      setShowUserLinks(showNav);
    } catch (error) {
      console.error(error);
    }
  };

  const checkManagerAuth = async () => {
    try {
      const result = await axiosAPI
        .hasStoreManagerAccess({ navCheck: true });

      const { showNav } = result.data;
      setShowManagerLink(showNav);
    } catch (error) {
      console.error(error);
    }
  };

  const navBarBox = {
    state: {
      showManagerLink,
      showUserLinks,
    },
    handles: {
      handleLogout: async () => {
        try {
          const result = await axiosAPI.logout();
          const { message } = result.data;
          sessionStorage.clear();
          dispatchUser({ type: 'reset' });
          navigate('/');
        } catch (error) {
          setToastMsg(`${error.message}. Please contact us at rescue_help_desk@gmail.com if the error continues.`);
        }
      },
    },
  };

  useEffect(() => {
    checkManagerAuth();
    checkUserAuth();
  }, [userData]);

  return (
    <NavBar navBarBox={navBarBox} />
  );
};

export default Navigation;
