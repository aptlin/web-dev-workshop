import React, { useEffect } from 'react';
import config from '../../config';

export interface InfiniteScrollProps {
  onFetchMore?: () => void;
  activationDistance?: number;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onFetchMore = () => {},
  activationDistance = config.constants.ACTIVATION_DISTANCE,
}) => {
  useEffect(() => {
    const onScroll = () => {
      const documentHeight = document.body.offsetHeight;
      const scrollHeight = window.innerHeight + window.scrollY;

      if (scrollHeight + activationDistance >= documentHeight) {
        onFetchMore();
      }
    };
    window.addEventListener('scroll', onScroll, false);
    return () => window.removeEventListener('scroll', onScroll, false);
  }, []);
  return <div>{children}</div>;
};

export default InfiniteScroll;
