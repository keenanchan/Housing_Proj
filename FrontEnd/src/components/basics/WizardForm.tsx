import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ZodSchema, ZodIssue } from 'zod';
import { miscIcons } from '../../assets/icons/all';

type ValidationError =
  | { success: true; error: undefined; data?: string }
  | { success: false; error: ZodIssue; data?: string }; // TODO maybe make data just undefined here

type ValidationErrors<P> = Partial<
  {
    [key in keyof P]: ValidationError;
  }
>;

/**
 * Each child component will be given:
 * - nextStep()/prevStep() function to navigate the form
 * - an exit() function to exit the form (i.e. when the user completes the form)
 * - a submitForm() which can be called when you would like to submit the form (it returns T/F based on success of onSubmit and validationChecks)
 * // TODO
 */
type SubmitForm = () => Promise<{ success: boolean; message?: string }>;
type SetStore<P> = (value: Partial<P>) => void;
export type WizardFormStep<P> = Partial<P> & {
  exitWizardForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (i: number) => void;
  submitForm: SubmitForm; // returns success or failure with a message
  validations: ValidationErrors<P> | undefined; // validation errors
  setStore: SetStore<P>;
};

// T is whatever is in the store
interface WizardFormProps<T = {}> {
  children: React.ReactElement[]; // the steps of the form (needs to be of length at least 0)
  show: boolean;
  setShow: (show: boolean) => void; // TODO this should be onHide! No need for the setShow(true)
  title: string;
  onSubmit: (store: T) => boolean;
  initialStore: Partial<T>[];
  schemas: ZodSchema<Partial<T>>[];
  lastButtonAsInactiveArrow?: boolean;
  lastButtonText?: string;
}

/**
 * Not using React.FC as a work around to allow for generics for Wizard Form.
 * Do not do this normally. I will try to find a better way to do this
 */
/**
 * Wizard Form React Component.
 */
const WizardForm = <T extends {}>({
  children,
  show,
  setShow,
  title,
  onSubmit,
  initialStore,
  schemas,
  lastButtonAsInactiveArrow,
  lastButtonText = 'Submit',
}: WizardFormProps<T>) => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(
    curIndex === children.length - 1,
  );
  const [CurStep, setCurStep] = useState<React.ReactElement>(children[0]);

  const [store, setCompleteStore] = useState<Array<Partial<T>>>(initialStore);

  // keeps track of the errors for each field
  const [validations, setValidations] = useState<
    Array<ValidationErrors<Partial<T>> | undefined>
  >(children.map(() => undefined));

  useEffect(() => {
    setCurStep(children[curIndex]);
    setIsFirst(curIndex === 0);
    setIsLast(curIndex === children.length - 1);
  }, [curIndex, children]);

  /**
   * Use this to exit the wizard form without submitting.
   */
  const exitWizardForm = () => {
    setShow(false);
  };

  const combineSuccesses = (v: ValidationErrors<Partial<T>>): boolean => {
    return (
      (Object.values(v) as Array<ValidationError>).find(
        (data) => !data.success,
      ) === undefined
    );
  };

  const validatePickedValues = <P extends {} | unknown = unknown>(
    schema: ZodSchema<P>,
    toParse: Partial<P>,
    toValidate: Array<keyof P>,
  ) => {
    const result = schema.safeParse(toParse);
    let changedErrors: ValidationErrors<P> | undefined;
    if (!result.success) {
      const { fieldErrors } = result.error.formErrors;
      changedErrors = toValidate.reduce(
        (pre, key) => {
          if (fieldErrors[key as string]) {
            return {
              ...pre,
              [key]: { success: false, error: fieldErrors[key as string][0] },
            };
          }
          return { ...pre, [key]: { success: true, error: undefined } };
        },
        { ...validations[curIndex] } as ValidationErrors<P>,
      );
    } else {
      changedErrors = toValidate.reduce(
        (pre, key) => ({ ...pre, [key]: { success: true, error: undefined } }),
        { ...validations[curIndex] } as ValidationErrors<P>,
      );
    }
    return changedErrors;
  };

  /**
   * Validates and updates current step.
   * @param i The step to validate.
   * @return If the data is all valid.
   */
  const validateStep = (i: number): boolean => {
    const stepValidations = validatePickedValues<Partial<T>>(
      schemas[i],
      store[i],
      Object.keys(store[i]) as (keyof T)[],
    );

    setValidations({
      ...validations,
      [i]: { ...validations[i], ...stepValidations },
    });

    const stepValidation: boolean = combineSuccesses(stepValidations);

    return stepValidation;
  };

  /**
   * Validates current form step.
   * @return If the data is all valid.
   */
  const validateCurrent = (): boolean => {
    // validate everything that hasn't been validated yet
    return validateStep(curIndex);
  };

  /**
   * Use this to navigate the wizard form to a specific step.
   * This will validate all the steps from the current step
   * to the selected step and navigate to either the first
   * step that is invalid or to the selected step.
   * @param step The step to change to.
   */
  const setStep = (step: number) => {
    // if clicked a later step, validate all steps from current to the selected step
    if (step > curIndex) {
      for (let i = curIndex; i < Math.min(step, children.length); i++) {
        if (!validateStep(i)) {
          setCurIndex(i);
          return;
        }
      }
    }

    // if reached here, all previous steps are valid
    if (step <= 0) setCurIndex(0);
    if (step >= children.length) setCurIndex(children.length - 1);
    setCurIndex(step);
  };

  /**
   * Use this to navigate the wizard form to the next step.
   * This will first validate the current step and will
   * move to the next one if possible.
   */
  const nextStep = () => {
    // first validate
    const dataIsValid = validateCurrent();

    if (dataIsValid && curIndex + 1 < children.length) {
      setCurIndex(curIndex + 1);
    }
  };

  /**
   * Use this to navigate the wizard form to the previous step.
   */
  const prevStep = () => {
    if (curIndex - 1 >= 0) setCurIndex(curIndex - 1);
  };

  /**
   * Use this to submit the form (it checks validation values first).
   * Returns T/F based on success of validation values and onSubmit.
   * (i.e. returns false if any validations are false, returns false
   * if onSubmit returns false, otherwise returns true).
   */
  const submitForm: SubmitForm = async () => {
    for (let i = curIndex; i < children.length; i++) {
      if (!validateStep(i)) {
        setCurIndex(i);
        return { success: false, message: "Didn't pass validation." };
      }
    }

    // Everything should be validated by this point
    const combined = Object.values(store).reduce((pre, cur) => ({
      ...pre,
      ...cur,
    }));
    const success = await onSubmit(combined as T);
    if (success) exitWizardForm();
    return { success };
  };

  const setStore: SetStore<T> = (value: Partial<T>) => {
    const changedValues = { ...store[curIndex], ...value };
    setCompleteStore({ ...store, [curIndex]: changedValues });

    // get the changed edited fields and set that they were changed
    const changedEditedFields = (Object.keys(value) as Array<keyof T>).reduce<
      Partial<{ [key in keyof T]: boolean }>
    >((prev, key) => {
      prev[key] = true;
      return prev;
    }, {});

    // every time there's a change, validate it
    const changedErrors = validatePickedValues<Partial<T>>(
      schemas[curIndex],
      changedValues,
      Object.keys(changedEditedFields) as (keyof T)[],
    );

    setValidations({
      ...validations,
      [curIndex]: { ...validations[curIndex], ...changedErrors },
    });
  };

  return (
    <Modal
      dialogClassName="wizard-form-modal-dialog"
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <div className="h-100 w-100">
        <div className="wizard-form-top-bar">
          <Button variant="no-show" onClick={() => setShow(false)}>
            <miscIcons.orangeX />
          </Button>
          <div className="title">{title}</div>
          <div />
        </div>

        <div className="wizard-form-middle">
          {React.cloneElement(CurStep, {
            nextStep,
            prevStep,
            setStep,
            exitWizardForm,
            submitForm,
            setStore,
            validations: validations[curIndex],
            ...store[curIndex],
          })}
        </div>

        <div className="wizard-form-bottom-bar">
          <div className="d-flex">
            {children.map((c, i) => (
              <div className="mx-1">
                <Button variant="no-show" onClick={() => setStep(i)}>
                  {i === curIndex ? (
                    <miscIcons.smallEllipseActive />
                  ) : (
                    <miscIcons.smallEllipseInactive />
                  )}
                </Button>
              </div>
            ))}
          </div>

          <div className="d-flex">
            <div className="mr-2 align-self-center">
              {isFirst ? (
                <Button variant="no-show">
                  <miscIcons.smallLeftArrowDisabled />
                </Button>
              ) : (
                <Button variant="no-show" onClick={prevStep}>
                  <miscIcons.smallLeftArrow />
                </Button>
              )}
            </div>

            <div className="ml-2 align-self-center">
              {isLast ? (
                (lastButtonAsInactiveArrow && (
                  <Button variant="no-show">
                    <miscIcons.smallRightArrowDisabled />
                  </Button>
                )) || (
                  <Button
                    variant="secondary"
                    className="m-0"
                    onClick={submitForm}
                  >
                    {lastButtonText}
                  </Button>
                )
              ) : (
                <Button variant="no-show" onClick={nextStep}>
                  <miscIcons.smallRightArrow />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WizardForm;
