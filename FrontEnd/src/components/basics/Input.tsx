import React, { useState } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import * as z from 'zod';

export interface InputProps
  extends FormControlProps,
    Omit<
      React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
      'onChange'
    > {
  label?: string;
  labelClassName?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  errorClassName?: string;
  inlinePostText?: string;
  postTextClassName?: string;
  required?: boolean;
  rows?: number; // TODO should be in the html attributes of htmltextareaelement???
}

const Input: React.FC<InputProps> = ({
  label,
  labelClassName = '',
  error,
  errorClassName = '',
  inlinePostText,
  postTextClassName = '',
  required,
  className = '',
  readOnly,
  onChange,
  isInvalid,
  isValid,
  value,
  children,
  ...formControlProps
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(!value || value === '');

  return (
    <Form.Group>
      {(label || required) && (
        <Form.Label className={`input-label ${labelClassName}`}>
          {label}
          {required && <span className="input-required-asterisk"> *</span>}
        </Form.Label>
      )}
      <div className="d-flex">
        <Form.Control
          {...formControlProps}
          value={value}
          className={
            (isEmpty && !readOnly ? 'input-unfilled ' : 'input-filled ') +
            (readOnly ? 'input-readonly' : '') +
            ((isInvalid || error) && !readOnly ? 'input-invalid ' : '') +
            className
          }
          isValid={!readOnly && isValid}
          readOnly={readOnly}
          onChange={(e) => {
            setIsEmpty(!e.target.value || e.target.value === '');
            if (onChange) {
              onChange(e);
            }
          }}
        />

        {inlinePostText && (
          <div className={`input-inline-text ${postTextClassName}`}>
            {inlinePostText}
          </div>
        )}
      </div>

      {children}

      {error && (
        <Form.Label className={`input-error ${errorClassName}`}>
          {error}
        </Form.Label>
      )}
    </Form.Group>
  );
};

export default Input;
