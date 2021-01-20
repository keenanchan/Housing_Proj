import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { selectShowNewUserPopup, selectUser } from '../redux/slices/auth';
import HouseCardList from '../components/HouseCardList';
import Filter from '../components/Filter';
import TV from '../components/TV';
import Login from '../components/Login';
import HousingPost from '../components/HousingPostForm';
import BookmarksList from '../components/BookmarksList';
import NewUserSetup from '../components/NewUserSetup';
import HouseSideBar from '../components/HouseSideBar';

const NewHome: React.FC = () => {
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
      <div className="new-home">
        <div className="new-home-main">
          <Filter />
          <HouseCardList />
        </div>

        <div className="new-home-sidebar">
          <HouseSideBar
            onLoginClick={() => setShowLogin(true)}
            onPostClick={() => setShowHousingPost(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default NewHome;
