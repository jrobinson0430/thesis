import React, { useContext, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Context from '../../../../utilities/contextProvider/Context';
import './NavBar.css';

const NavBar = ({ navBarBox }) => {
  const { state, handles } = navBarBox;
  const { showUserLinks, showManagerLink } = state;
  const { handleLogout } = handles;
  const { userData } = useContext(Context);
  const capper = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <Navbar
      className='p-1 text-light border1 sticky-top tanTexture'
      expand="lg"
    >
      <Navbar.Brand className='brandImg me-0' href='/' />
      {userData.firstName
        && (
        <Navbar.Text
          className="text-dark mb-0 text-center h5"
        >
          Welcome,&nbsp;
          {capper(userData.firstName)}
        </Navbar.Text>
        )}

      <Navbar.Toggle aria-controls="toggleHamburder" />
      <Navbar.Collapse className="justify-content-end" id="toggleHamburder">
        <Nav className='my-2 text-light'>

          <NavLink
            to='/'
            className='links'
            activeclassname="active"
          >
            Home
          </NavLink>
          <NavLink
            to='photoGallery'
            className='links'
            activeclassname="active"
          >
            Gallery
          </NavLink>
          <NavLink
            to='/donate'
            className='links'
            activeclassname="active"
          >
            Donate
          </NavLink>

          {showUserLinks
            && (
            <NavLink
              to='account'
              className='links'
              activeclassname="active"
            >
              Account
            </NavLink>
            )}

          {!showUserLinks
            && (
            <>
              <NavLink
                to="/log/login"
                className='links'
                activeclassname="active"
              >
                Login
              </NavLink>
              <NavLink
                to='/log/create'
                className='links'
                activeclassname="active"
              >
                Sign Up
              </NavLink>
            </>
            )}

          {userData.email
            && (
            <>
              {showManagerLink
                && (
                <NavLink
                  to='/manager'
                  className='links'
                  activeclassname="active"
                >
                  Manager
                </NavLink>
                )}

              <NavLink
                className='links'
                activeclassname="active"
                style={{ textDecoration: 'none' }}
                onClick={() => handleLogout()}
              >
                Logout
              </NavLink>
            </>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
