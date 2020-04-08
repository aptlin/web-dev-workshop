import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import { removeFavorite } from '../../actions/favorites';
import LikeButton from '../../components/Like';
import { useFavorites } from '../../services/Favorites';
import './index.css';
const Favorites: React.FC = () => {
  const { state, dispatch } = useFavorites();
  const { liked } = state;
  return (
    <Jumbotron>
      <h3 className={'text-nowrap'}>
        <strong>Favorites ({liked.length})</strong>
      </h3>
      {liked.map((favorite) => (
        <h5 className="d-flex" key={favorite}>
          <LikeButton
            onClick={() => {
              dispatch(removeFavorite(favorite));
            }}
          />
          <span>
            <Link to={`/${encodeURIComponent(favorite)}`}>
              <span>{favorite}</span>
            </Link>
          </span>
        </h5>
      ))}
    </Jumbotron>
  );
};
export default Favorites;
