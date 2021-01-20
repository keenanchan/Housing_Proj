import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { carouselIcons } from '../../../assets/icons/all';
import Thumbnails from './Thumbnails';
import SlideShowItem from './SlideShowItem';

export interface SlideShowItem {
  src: string;
  alt: string;
}

interface PathProps {
  images: SlideShowItem[];
  onImageClick?: (index: number) => any;
  className?: string;
  showPreview?: boolean;
}

const SlideShow: React.FC<PathProps> = ({
  images,
  onImageClick,
  className = '',
  showPreview,
}) => {
  // need to track animation so the user cannot click on a preview during animation
  const [animating, setAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className={`slideshow ${
        images.length > 5 ? 'slideshow-overflow' : ''
      } ${className}`}
    >
      <Carousel
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        nextIcon={<carouselIcons.rightArrow />}
        prevIcon={<carouselIcons.leftArrow />}
        interval={null}
        indicators={!showPreview}
        className={
          showPreview
            ? 'slideshow-carousel-preview'
            : 'slideshow-carousel-no-preview'
        }
      >
        {images.map(({ src, alt }, index) => (
          <SlideShowItem
            src={src}
            alt={alt}
            onClick={onImageClick && (() => onImageClick(index))}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
          />
        ))}
      </Carousel>

      {showPreview && (
        <Thumbnails
          images={images}
          activeIndex={activeIndex}
          onClick={(index) => !animating && setActiveIndex(index)}
        />
      )}
    </div>
  );
};

export default SlideShow;

export const testSlideShow: SlideShowItem[] = [
  {
    src:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bedroom-ideas-rds-work-queens-road-08-1593114639.jpg',
    alt: 'First slide',
  },
  {
    src:
      'https://curatedinterior.com/wp-content/uploads/2019/05/Neutral-gray-bedroom-via-@jessicamendesdesign.jpg',
    alt: 'Second slide',
  },
  {
    src:
      'https://st.hzcdn.com/simgs/pictures/bedrooms/abbot-ave-unit-h-christopher-lee-foto-img~1131a6990e8f8fcb_14-3211-1-404364d.jpg',
    alt: 'Third slide',
  },
];
