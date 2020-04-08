import React from 'react';
import { Button } from 'reactstrap';

interface ToggleFavoriteButtonProps {
  isFavorite: () => boolean;
  toggleFavorite: () => void;
}
const ToggleFavoriteButton: React.FC<ToggleFavoriteButtonProps> = ({
  isFavorite,
  toggleFavorite,
}) => {
  const favorite = isFavorite();
  return (
    <Button
      className="mt-2"
      color={favorite ? 'danger' : 'warning'}
      onClick={toggleFavorite}
    >
      {favorite ? 'Remove from favorites' : 'Add to favorites'}
    </Button>
  );
};

export default ToggleFavoriteButton;
