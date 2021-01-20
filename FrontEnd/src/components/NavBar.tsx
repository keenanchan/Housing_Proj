import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../redux/slices/auth';
import Login from './Login';
import ProfileModal from './ProfileModal';
import { navIcons } from '../assets/icons/all';

const NavBar: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
      <ProfileModal show={showProfile} setShow={setShowProfile} />

      <Navbar sticky="top" className="navbar-wrapper p-0 m-0 mb-4">
        <div className="navbar-container">
          <div className="mr-auto">
            <a className="navbar-brand" href="/">
              <navIcons.logo className="navbar-logo-svg" />
            </a>
          </div>

          <div>
            {!user ? (
              <Button
                variant="no-show"
                className="g-sign-in"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </Button>
            ) : (
              <>
                <Button
                  variant="no-show"
                  className="g-sign-in"
                  onClick={() => setShowProfile(true)}
                >
                  Profile
                </Button>
                <Button
                  variant="no-show"
                  className="g-sign-out"
                  onClick={() => dispatch(logout())}
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;
