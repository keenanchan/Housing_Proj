import React from 'react';
import { useDispatch } from 'react-redux';
import Page1, { Page1Store, page1InitialStore, page1Schema } from './Page1';
import Page2, { Page2Store, page2InitialStore, page2Schema } from './Page2';
import WizardForm from '../basics/WizardForm';
import { createNewUser } from '../../redux/slices/auth';

type Store = Page1Store & Page2Store;

const schemas = [page1Schema, page2Schema];

interface NewUserSetupProps {
  show: boolean;
  setShow: (show: boolean) => void;
  name?: string;
  email?: string;
}

// TODO only show PostPage1 for first time user
const NewUserSetup: React.FC<NewUserSetupProps> = ({
  show,
  setShow,
  name,
  email,
}) => {
  const dispatch = useDispatch();

  return (
    <WizardForm<Store>
      show={show}
      setShow={setShow}
      onSubmit={(data) => {
        console.log('clicked');
        console.log(data);

        dispatch(createNewUser(data));
        return true;
      }}
      title="Set up your account"
      initialStore={[{ ...page1InitialStore, name, email }, page2InitialStore]}
      schemas={schemas}
    >
      <Page1 />
      <Page2 />
    </WizardForm>
  );
};

export default NewUserSetup;
