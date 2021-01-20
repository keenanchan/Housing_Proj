import React from 'react';
import { SlideShowItem } from './index';

const widthPercent = (numCols: number, maxNumCols: number) =>
  `${Math.ceil(100 / Math.min(numCols, maxNumCols))}%`;

interface ThumbnailsProps {
  images: SlideShowItem[];
  activeIndex?: number;
  onClick?: (index: number) => any;
}

const Thumbnails: React.FC<ThumbnailsProps> = ({
  images,
  activeIndex,
  onClick,
}) => (
  <div className="slideshow-thumbnail">
    {images.map((image, index) => (
      <button
        type="button"
        style={{ width: widthPercent(images.length, 10) }}
        onClick={() => onClick && onClick(index)}
      >
        <img
          className={activeIndex === index ? 'selected-img' : ''}
          src={image.src}
          alt={image.alt}
        />
      </button>
    ))}
  </div>
);

export default Thumbnails;
