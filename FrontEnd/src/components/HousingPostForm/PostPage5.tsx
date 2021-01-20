import React from 'react';
import * as z from 'zod';
import { Container, Row, Col } from 'react-bootstrap';
import ImageUploader from 'homehub-images-upload';
import { WizardFormStep } from '../basics/WizardForm';

export const page5Schema = z.object({
  pictures: z.array(z.any()).min(1, 'You need to add some pictures!'),
});

export interface Page5Store {
  pictures: File[];
}

export const page5InitialStore: Page5Store = {
  pictures: [],
};

const PostPage5: React.FC<WizardFormStep<Page5Store>> = ({
  pictures,
  validations,
  setStore,
  submitForm,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">Upload photos of your place</span>
        </Col>
      </Row>

      <Row>
        <ImageUploader
          withIcon
          withPreview
          label=""
          onChange={(p) => {
            setStore({ pictures: [...p] });
          }}
          defaultFiles={pictures}
          defaultImages={pictures?.map((picture) =>
            URL.createObjectURL(picture),
          )}
          imgExtension={['.jpg', '.png', '.jpeg']}
          maxFileSize={5242880}
          className="house-post-image-uploader"
          buttonText="+"
          buttonClassName="house-post-image-uploader-btn"
          errorClass="house-post-error-label"
        />
      </Row>
      <div className="house-post-error-label">
        {validations?.pictures?.error}
      </div>
    </Container>
  );
};

export default PostPage5 as React.FC;
