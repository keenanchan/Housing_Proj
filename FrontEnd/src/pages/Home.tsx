import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectShowNewUserPopup, selectUser } from '../redux/slices/auth';
import HouseCardList from '../components/HouseCardList';
import Filter from '../components/Filter';
import Login from '../components/Login';
import HousingPost from '../components/HousingPostForm';
import NewUserSetup from '../components/NewUserSetup';
import HouseSideBar from '../components/HouseSideBar';
import Col from 'react-bootstrap/Col';

const Home: React.FC = () => {
  const showNewUserPopup = useSelector(selectShowNewUserPopup);
  const user = useSelector(selectUser);

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showHousingPost, setShowHousingPost] = useState<boolean>(false);

  return (
    <div>
      {/* Modals */}
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
      <HousingPost show={showHousingPost} setShow={setShowHousingPost} />

      {showNewUserPopup !== undefined && ( // TODO temporary. Should handle in the wizard form i think
        <NewUserSetup
          show={showNewUserPopup !== undefined}
          setShow={(value: boolean) => {
            console.log(
              'uhhh no clicking out of this form buddy! we gotta make the x look disabled in the future.',
            );
          }}
          name={showNewUserPopup?.name}
          email={showNewUserPopup?.email}
        />
      )}

      {/* The actual home page */}
      <div className="home">
        <div className="home-main">
          <Col className="home-filter">
            <Filter />
          </Col>

          <HouseCardList />
        </div>

        <div className="home-sidebar">
          <HouseSideBar
            onLoginClick={() => setShowLogin(true)}
            onPostClick={() => setShowHousingPost(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
