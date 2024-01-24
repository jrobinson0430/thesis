import React, { useState, useEffect, useReducer, useMemo } from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import { Fade } from 'react-bootstrap';
import { ToastAlert, Navigation } from './components';
import * as Pages from './pages';
import Context from './utilities/contextProvider/Context';
import { initial, update } from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorHandler from './pages/ErrorHandler/ErrorHandler';
import './main.css';

const App = () => {
  const [toastMsg, setToastMsg] = useState(null);
  const [open, setOpen] = useState(false);
  const [userData, dispatchUser] = useReducer(update.user, initial.user);
  const [unauthorizedMsg, setUnauthorizedMsg] = useState({});
  const [allAnimals, setAllAnimals] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const messagingBox = {
    toastMsg,
    setToastMsg,
    unauthorizedMsg,
    setUnauthorizedMsg,
  };

  useEffect(() => { // resets the toast message
    setOpen(Boolean(toastMsg));
    setTimeout(() => setOpen(false), 2100);
  }, [toastMsg]);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      dispatchUser({ type: 'overwrite', payload: loggedInUser });
    }
  }, []);

  return (
    <Context.Provider
    // useMemo helps with performance.
      value={useMemo(() => (
        {
          userData,
          dispatchUser,
          messagingBox,
          navigate,
          location,
        }
      ), [userData, dispatchUser, messagingBox, navigate, location])}
    >
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={(<Pages.Home />)}
        />
        <Route
          path="photoGallery/*"
          element={(
            <Pages.PhotoGallery
              allAnimals={allAnimals}
              setAllAnimals={setAllAnimals}
            />
          )}
        />
        <Route
          path="donate/"
          element={<Pages.Donate />}
        />
        <Route
          path="account/*"
          element={(
            <Pages.Account />)}
        />
        <Route
          path="manager/*"
          element={(
            <Pages.Manager
              allAnimals={allAnimals}
              setAllAnimals={setAllAnimals}
            />
          )}
        />

        {/* Login/Signup */}
        <Route
          path="/log/*"
          element={<Pages.Log />}
        />
        <Route
          path="*"
          element={(<ErrorHandler />)}
        />
      </Routes>

      {/* This adds an effect to the toast messages */}
      <Fade onExited={() => setToastMsg(null)} in={open}>
        <div><ToastAlert toastMsg={toastMsg} /></div>
      </Fade>
    </Context.Provider>
  );
};

export default App;
