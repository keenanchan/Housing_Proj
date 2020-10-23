import React, { useEffect, useState } from 'react';
import SlideShow from '../SlideShow';
import { getHousingFake } from '../../apis/mocks/housing';

export const SlideShowAPI: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    getHousingFake().then((response) => {
      setImages(
        response
          ? response[0]['photo']
          : ['https://houseit.s3.us-east-2.amazonaws.com/test0.png'],
      );
    });
  });
  const testSlideShow = images.map((link) => ({
    src: 'https://houseit.s3.us-east-2.amazonaws.com/' + link,
    alt: 'hahahahalooool',
  }));
  return <SlideShow images={testSlideShow} onImageClick={() => {}} />;
};
