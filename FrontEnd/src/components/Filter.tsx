import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import FilterForm from './FilterForm';
import { filterIcons } from '../assets/icons/all';
import { selectShowFilter, setShow } from '../redux/slices/filter';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const showFilter = useSelector(selectShowFilter);
  const setShowFilter = (value: boolean) => dispatch(setShow(value));

  return (
    <>
      {/* Header in the home page */}
      <div className="filter-launch-pad">
        <filterIcons.hello className="disappear-on-sm" />
        <filterIcons.arrow className="disappear-on-sm" />
        <Button onClick={() => setShowFilter(true)}>Find your place</Button>
        <filterIcons.arrow className="disappear-on-sm" />
        <filterIcons.loveHouse className="disappear-on-sm" />
      </div>

      {/* The filter itself */}
      <FilterForm show={showFilter} setShow={setShowFilter} />
    </>
  );
};

export default Filter;
