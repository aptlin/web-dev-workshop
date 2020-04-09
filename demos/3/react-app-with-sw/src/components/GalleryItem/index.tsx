import React, { useState } from 'react';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import { Card } from 'reactstrap';
import { GIFObject } from '../../types/giphy';
import { ImageLoader } from '../ImageLoader';
interface GalleryItemProps {
  experience: GIFObject;
  isCompressed?: boolean;
}
function getImage(experience: GIFObject, isCompressed?: boolean) {
  return isCompressed
    ? experience.images.fixed_width
    : experience.images.original;
}
const GalleryItem: React.FC<GalleryItemProps> = ({
  experience,
  isCompressed = true,
}) => {
  const [isSeen, setSeen] = useState(false);
  const image = getImage(experience, isCompressed);
  const loader = (
    <ImageLoader
      minHeight={`${image.height}px`}
      minWidth={`${image.width}px`}
    />
  );
  const onVisible = (isVisible: boolean) => {
    if (isVisible && !isSeen) {
      setSeen(true);
    }
    return;
  };
  return (
    <Card
      style={{
        background: '#fff',
        border: 'none',
        margin: '5px',
      }}
    >
      <VisibilitySensor partialVisibility={true} onChange={onVisible}>
        {isSeen ? (
          <Img
            src={image.url}
            loader={loader}
            style={{ flexShrink: 0, width: '100%' }}
          />
        ) : (
          loader
        )}
      </VisibilitySensor>
    </Card>
  );
};
export default GalleryItem;
