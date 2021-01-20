import React from 'react';
import * as z from 'zod';
import { Container, Form, Row } from 'react-bootstrap';
import { WizardFormStep } from '../basics/WizardForm';
import Input from '../basics/Input';

export const page2Schema = z.object({
  description: z
    .string()
    .min(1, 'You need to provide an introduction for others!')
    .max(600, 'Your introduction can only have maximum of 600 characters'),
});

export type Page2Store = z.infer<typeof page2Schema>;

export const page2InitialStore: Page2Store = {
  description: '',
};

const PostPage2: React.FC<WizardFormStep<Page2Store>> = ({
  description,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Input
        label="What's your lifestyle like?"
        as="textarea"
        value={description}
        placeholder="Introduce yourself to your potential roommates!"
        rows={10}
        onChange={(e) => setStore({ description: e.target.value })}
        isValid={validations?.description?.success}
        error={validations?.description?.error}
        required
      />
    </Container>
  );
};

export default PostPage2 as React.FC;
