import React from 'react';
import { CarouselItem, CarouselItemProps } from 'reactstrap';

interface SlideShowItemProps extends CarouselItemProps {
  src: string;
  alt: string;
  onClick?: () => any; // Pick<HTMLProps<HTMLButtonElement>, 'onClick'>;
}

const SlideShowItem: React.FC<SlideShowItemProps> = ({
  src,
  alt,
  onClick,
  ...carouselItemProps
}) => {
  const imageElement = (
    <img src={src} alt={alt} className="d-block w-100 h-100" />
  );

  return (
    <CarouselItem {...carouselItemProps} key={src}>
      {onClick ? (
        <button
          className="no-show w-100 h-100"
          type="button"
          onClick={onClick}
          onKeyDown={({ key }) => key === 'Enter' && onClick()}
        >
          {imageElement}
        </button>
      ) : (
        imageElement
      )}
    </CarouselItem>
  );
};

export default SlideShowItem;
