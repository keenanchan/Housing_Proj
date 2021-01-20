import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form } from 'react-bootstrap';
import Input, { InputProps } from './basics/Input';
// import { useSelector, useDispatch } from 'react-redux';
// import { setPost, selectPost } from '../redux/slices/posting';
// import { getDurationInMinutes } from '../apis/google';

interface PathProps extends Omit<InputProps, 'onChange' | 'onSelect'> {
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  initialAddress?: string;
}

const AutoComplete: React.FC<PathProps> = ({
  className = '',
  onChange,
  onSelect,
  initialAddress = '',
  ...inputProps
}) => {
  const [address, setAddress] = useState<string>(initialAddress);
  // TODO
  // (add) => {
  //   dispatch(setPost(['address', add]));
  //   getDurationInMinutes(add).then((distance: any) => {
  //     dispatch(setPost(['distance', distance ? distance : 'unknown']));
  //   });
  // }
  return (
    <PlacesAutocomplete
      value={address}
      onChange={(value) => {
        setAddress(value);
        if (onChange) onChange(value);
      }}
      onSelect={(value) => {
        // TODO this gets called even when a user doesn't select one of the dropdown suggestions
        setAddress(value);
        if (onSelect) onSelect(value);
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          {/* <Form.Control
            // TODO fix prop spread is forbidden
            {...getInputProps({
              placeholder: 'Search Places ...',
              className,
            })}
            isValid={isValid}
            isInvalid={isInvalid}
          /> */}
          <Input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className,
            })}
            {...inputProps}
          >
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => (
                // TODO: Missing "key" prop for element in iterator
                <div
                  {
                    /* TODO fix 'Prop spreading is forbidden' */
                    ...getSuggestionItemProps(suggestion, {
                      className: 'suggestion-item',
                      // style: suggestion.active
                      //   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      //   : { backgroundColor: '#ffffff', cursor: 'pointer' },
                    })
                  }
                  key={suggestion.description}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          </Input>
        </>
      )}
    </PlacesAutocomplete>
  );
};

export default AutoComplete;
