import React, { useEffect } from 'react';
import config from '../../config';
import throttle from 'lodash.throttle';

export interface InfiniteScrollProps {
  onFetchMore?: () => void;
  activationDistance?: number;
  throttlingPeriod?: number;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onFetchMore = () => {},
  activationDistance = config.constants.ACTIVATION_DISTANCE,
  throttlingPeriod = config.constants.THROTTLING_PERIOD,
}) => {
  useEffect(() => {
    const onScroll = throttle(() => {
      const documentHeight = document.body.offsetHeight;
      const scrollHeight = window.innerHeight + window.scrollY;

      if (scrollHeight + activationDistance >= documentHeight) {
        onFetchMore();
      }
    }, throttlingPeriod);

    window.addEventListener('scroll', onScroll, false);

    return () => window.removeEventListener('scroll', onScroll, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{children}</div>;
};

export default InfiniteScroll;
