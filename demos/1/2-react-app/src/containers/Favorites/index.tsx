import React from "react";
import { ListGroup, ListGroupItem, Badge, Button } from "reactstrap";
import LikeButton from "../../components/Like";
import startCase from "lodash.startcase";
import { Link, useLocation } from "react-router-dom";
import "./index.css";

export function toggleFavorite(
  experienceName: string,
  log: ExperienceLog,
  updateArchive: UpdateArchive
) {
  const isFavorite = !log.isFavorite;
  log.isFavorite = isFavorite;
  updateArchive(prevArchive => ({
    ...prevArchive,
    ...{ [experienceName]: log }
  }));
}

const Favorites: React.FC<IFavorites> = ({ archive, updateArchive }) => {
  const favorites = Object.keys(archive)
    .filter(key => archive[key].isFavorite)
    .reduce((obj: IArchive, key: string) => {
      obj[key] = archive[key];
      return obj;
    }, {});

  const favoritesList = Object.keys(favorites).map((experienceName, idx) => {
    const log = favorites[experienceName];
    return (
      <h5 className="d-flex">
        <LikeButton
          on={log.isFavorite}
          onClick={() => {
            toggleFavorite(experienceName, log, updateArchive);
          }}
        />
        <span>
          <Link to={`/${experienceName}`}>{startCase(log.title)}</Link>
        </span>
      </h5>
    );
  });
  return (
    <div className="mt-5">
      <h4 className={"text-nowrap"}>
        Favorites ({Object.keys(favorites).length})
      </h4>
      {favoritesList}
    </div>
  );
};

export default Favorites;
