import React, { useState } from 'react';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import { Card } from 'reactstrap';
import { GIFObject } from '../../types/giphy';
import { ImageLoader } from '../ImageLoader';
interface GalleryItemProps {
  experience: GIFObject;
}
const GalleryItem: React.FC<GalleryItemProps> = ({ experience }) => {
  const [isSeen, setSeen] = useState(false);
  const loader = (
    <ImageLoader
      minHeight={`${experience.images.fixed_width.height}px`}
      minWidth={`${experience.images.fixed_width.width}px`}
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
            src={experience.images.fixed_width.url}
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
