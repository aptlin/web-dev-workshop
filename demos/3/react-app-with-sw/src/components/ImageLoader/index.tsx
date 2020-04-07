import React from 'react';
import { Spinner } from 'reactstrap';

interface ImageLoaderProps {
  minHeight: string;
  minWidth: string;
}
export const ImageLoader: React.FC<ImageLoaderProps> = ({
  minHeight,
  minWidth,
  ...props
}) => (
  <div
    className="item-placeholder"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight,
      minWidth,
    }}
    {...props}
  >
    <Spinner type="border" role="status" color="dark" />
  </div>
);
