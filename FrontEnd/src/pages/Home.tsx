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

const Home: React.FC = () => {
  const showNewUserPopup = useSelector(selectShowNewUserPopup);
  const user = useSelector(selectUser);

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showHousingPost, setShowHousingPost] = useState<boolean>(false);
  const handleShowHousingPost = () => setShowHousingPost(true);

  return (
    <Container fluid>
      {/* Modals */}
      <Login show={showLogin} handleClose={handleCloseLogin} />
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
      <Row>
        <Col md={{ span: 8, offset: 1 }} className="my-auto">
          <div className="mb-5">
            <Filter />
          </div>

          <div>
            <HouseCardList />
          </div>
        </Col>
        <div className="home-sidebar d-flex flex-column">
          <div className="mb-3">
            <TV>
              <div className="special-text mt-3">Hello</div>
              <div className="tv-separator" />
              {!user ? (
                <>
                  <Button variant="secondary" onClick={handleShowLogin}>
                    Sign in to post
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" onClick={handleShowHousingPost}>
                    Post here
                  </Button>
                </>
              )}
            </TV>
          </div>

          <div className="home-bookmarks-list-wrapper">
            <BookmarksList />
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Home;
