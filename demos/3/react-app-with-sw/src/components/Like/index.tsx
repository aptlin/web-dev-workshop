import React, { EventHandler, SyntheticEvent } from 'react';
import './index.css';

interface LikeProps {
  onClick: EventHandler<SyntheticEvent<HTMLSpanElement>>;
}
const LikeButton: React.FC<LikeProps> = ({ onClick }) => {
  return (
    <div className="mx-2">
      <span className="heart" onClick={onClick}></span>
    </div>
  );
};

export default LikeButton;
