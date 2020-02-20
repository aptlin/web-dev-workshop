import startCase from "lodash.startcase";
import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import LikeButton from "../../components/Like";
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
    <div>
      <Jumbotron>
        <h4 className={"text-nowrap"}>
          Favorites ({Object.keys(favorites).length})
        </h4>
        {favoritesList}
      </Jumbotron>
    </div>
  );
};

export default Favorites;
