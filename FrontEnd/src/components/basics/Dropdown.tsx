import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { Form } from 'react-bootstrap';
import BootstrapDropdown, * as BootstrapDropdownMetadata from 'react-bootstrap/Dropdown';
import * as z from 'zod';

// TODO make this its own component/file
const useClickAwayListener = (
  refs: MutableRefObject<HTMLElement | undefined | null>[],
  onClickAway: (e: MouseEvent) => any,
  active = true,
) => {
  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (
        active &&
        e.target !== null &&
        !refs.find(
          (ref) =>
            ref && ref.current && ref.current.contains(e.target as Element),
        )
      ) {
        onClickAway(e);
      }
    };

    // Bind the event listener
    document.addEventListener('click', handleClickAway);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickAway);
    };
  }, [refs, onClickAway, active]);
};

interface DropdownProps extends BootstrapDropdownMetadata.DropdownProps {
  options: string[];
  initialSelected?: string; // TODO eventually make this type oneof options array
  label?: string;
  labelClassName?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  errorClassName?: string;
  placeholder?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  required?: boolean;
  noFilter?: boolean; // Will make the user unable to filter through the options by typing in the dropdown's input
  inlineText?: string;
  inlineTextClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  labelClassName = '',
  error,
  errorClassName = '',
  initialSelected,
  placeholder,
  isInvalid,
  isValid, // only provide this if you want a green checkmark. Should only be provided when multiple dropdowns are working in unison
  required,
  noFilter,
  inlineText,
  inlineTextClassName = '',
  className = '',
  options,
  onSelect,
  ...dropdownProps
}) => {
  const [selected, setSelected] = useState<string | undefined>(initialSelected);
  const [isEmpty, setIsEmpty] = useState<boolean>(!selected || selected === '');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | undefined>();
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  const dropdownRef = useRef<HTMLElement>();
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  useClickAwayListener(
    [dropdownRef, dropdownMenuRef],
    () => setFilter(undefined),
    !noFilter,
  );

  const updateIsEmpty = (s?: string | null) => {
    if (s) setIsEmpty(!s || s === '');
    else setIsEmpty(!selected || selected === '');
  };

  useEffect(() => {
    const filtered = options.filter(
      (option) => option.toLowerCase().includes(filter?.toLowerCase() || ''), // TODO for some reason filtering with a space causes issues?
    );
    setFilteredOptions(filtered);
  }, [filter, options]);

  return (
    <Form.Group>
      {(label || required) && (
        <Form.Label className={`dropdown-label ${labelClassName}`}>
          {label}
          {required && <span className="input-required-asterisk"> *</span>}
        </Form.Label>
      )}

      <div className="d-flex">
        <BootstrapDropdown
          onSelect={(s, e) => {
            setSelected(s || undefined);
            updateIsEmpty(s);
            setFilter(undefined);

            if (onSelect) onSelect(s, e);
          }}
          ref={dropdownRef}
          className={`homehub-dropdown ${className}`}
          {...dropdownProps}
        >
          <BootstrapDropdown.Toggle
            variant="no-show"
            className="dropdown-toggle"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="d-flex flex-nowrap">
              <Form.Control
                value={filter !== undefined ? filter : selected || ''}
                placeholder={placeholder}
                className={`${
                  (isEmpty && !isFocused
                    ? 'dropdown-unfilled '
                    : 'dropdown-filled ') +
                  (isInvalid || error ? 'dropdown-invalid ' : '')
                } dropdown-straighten-right`}
                isValid={isValid}
                readOnly={noFilter}
                onChange={(e) => {
                  if (!noFilter) setFilter(e.target.value);
                }}
                onFocus={() => {
                  if (!noFilter) setFilter('');
                }}
              />

              <div
                className={
                  (isEmpty && !isFocused
                    ? 'dropdown-drop-btn-unfilled '
                    : 'dropdown-drop-btn-filled ') +
                  (isInvalid || error ? 'dropdown-drop-btn-invalid ' : '')
                }
              >
                <div className="dropdown-drop-btn-arrow" />
              </div>
            </div>
          </BootstrapDropdown.Toggle>

          <BootstrapDropdown.Menu ref={dropdownMenuRef}>
            {filteredOptions.map((option) => (
              <BootstrapDropdown.Item key={option} eventKey={option}>
                {option}
              </BootstrapDropdown.Item>
            ))}
          </BootstrapDropdown.Menu>
        </BootstrapDropdown>

        {inlineText && (
          <div className={`dropdown-inline-text ${inlineTextClassName}`}>
            {inlineText}
          </div>
        )}
      </div>

      {error && (
        <Form.Label className={`dropdown-error ${errorClassName}`}>
          {error}
        </Form.Label>
      )}
    </Form.Group>
  );
};

export default Dropdown;
