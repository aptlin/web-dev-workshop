import React from "react";
import "./index.css";

const LikeButton: React.FC<ILike> = ({ on, onClick }) => {
  return (
    <div className="mx-2">
      <span
        className="heart"
        style={{
          filter: on ? "none" : "grayscale(100%) invert(100%) "
        }}
        onClick={onClick}
      ></span>
    </div>
  );
};

export default LikeButton;
