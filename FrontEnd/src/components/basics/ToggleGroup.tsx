import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import * as z from 'zod';
import Toggle from './Toggle';
import { Icon } from '../../assets/icons/all';

export interface ToggleContent {
  icon: Icon;
  label: string;
}

interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  content: string[] | ToggleContent[];
  initialSelected?: boolean[] | string[] | string; // TODO define this to be the same length as content somehow? Also allow this to be an array of strings
  singleSelect?: boolean; // makes it so only one toggle will be selected
  hideLabels?: boolean;
  center?: boolean; // determines whether or not to center the toggles/labels/errors
  onSelect?: (
    newlySelected: { label: string; selected: boolean },
    allSelected: boolean[], // TODO change this to be { label: string; selected: boolean }, and change toggle group to keep track of which are selected with label instead of array of booleans
  ) => any;
  label?: string;
  labelClassName?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  errorClassName?: string;
  toggleClassName?: string;
  required?: boolean;
}

const getLabels = (content: string[] | ToggleContent[]): string[] => {
  return (content as [ToggleContent | string]).map((c) =>
    typeof c === 'string' ? c : c.label,
  );
};

const selectedAsBoolArr = (
  content: string[] | ToggleContent[],
  selected: boolean[] | string[] | string,
): boolean[] => {
  if (Array.isArray(selected)) {
    if (typeof selected[0] === 'string') {
      return getLabels(content).map((label) =>
        (selected as string[]).includes(label),
      );
    }
    return selected as boolean[];
  }

  return getLabels(content).map((label) => label === selected);
};

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  content,
  initialSelected,
  singleSelect,
  hideLabels,
  center,
  onSelect,
  label,
  labelClassName = '',
  error,
  errorClassName = '',
  toggleClassName = '',
  required,
  className = '',
  ...wrapperProps
}) => {
  const typedInitialSelected = useRef<undefined | boolean[]>(
    initialSelected ? selectedAsBoolArr(content, initialSelected) : undefined,
  );
  const [areSelected, setAreSelected] = useState<boolean[]>(
    typedInitialSelected.current ||
      (content as [string | ToggleContent]).map(() => false),
  );

  return (
    <Form.Group
      className={`toggle-group ${center ? 'toggle-group-center' : ''}`}
    >
      {(label || required) && (
        <Form.Label className={`toggle-group-label ${labelClassName}`}>
          {label}
          {required && (
            <span className="toggle-group-required-asterisk"> *</span>
          )}
        </Form.Label>
      )}

      <div
        {...wrapperProps}
        className={`toggle-group-wrapper ${
          center ? 'toggle-group-center' : ''
        } ${className}`}
      >
        {(content as [string | ToggleContent]).map((c, index) => {
          const curLabel = typeof c === 'string' ? c : c.label;
          const icon = typeof c !== 'string' ? c.icon : undefined;

          return (
            <Toggle
              label={curLabel}
              icon={icon}
              hideLabel={hideLabels}
              initialSelected={
                typedInitialSelected.current &&
                typedInitialSelected.current[index]
              }
              selected={areSelected[index]}
              onClick={(newSelected) => {
                const updatedSelected = singleSelect
                  ? areSelected.map((s, i) => index === i)
                  : { ...areSelected, [index]: newSelected };
                setAreSelected(updatedSelected);

                if (onSelect) {
                  onSelect(
                    { label: curLabel, selected: newSelected },
                    updatedSelected,
                  );
                }
              }}
              key={curLabel}
              className={`${toggleClassName} + ${
                !center ? ' toggle-group-line-up-toggle' : ''
              }`}
            />
          );
        })}
      </div>

      {error && (
        <Form.Label className={`toggle-group-error ${errorClassName}`}>
          {error}
        </Form.Label>
      )}
    </Form.Group>
  );
};

export default ToggleGroup;
