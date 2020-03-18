import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import LikeButton from "../../components/Like";
import { GalleryContextConsumer } from "../../services/Gallery";
import "./index.css";

export function toggleFavorite(
  log: ExperienceLog,
  state: ArchiveState,
  dispatch: ArchiveDispatch
) {
  const isFavorite = !log.isFavorite;
  log.isFavorite = isFavorite;
  const action: ArchiveAction = {
    type: "update",
    data: {
      ...state,
      ...{ [log.title]: log }
    }
  };
  dispatch(action);
}

const Favorites: React.FC = () => {
  return (
    <GalleryContextConsumer>
      {({ state, dispatch }: GalleryState) => {
        const favorites = Object.keys(state)
          .filter(key => state[key].isFavorite)
          .reduce((obj: ArchiveState, key: string) => {
            obj[key] = state[key];
            return obj;
          }, {});

        const favoritesList = Object.keys(favorites).map(experienceName => {
          const log = favorites[experienceName];
          return (
            <h5 className="d-flex" key={experienceName}>
              <LikeButton
                on={log.isFavorite}
                onClick={() => {
                  toggleFavorite(log, state, dispatch);
                }}
              />
              <span>
                <Link to={`/${experienceName}`}>
                  <span>{log.title}</span>
                </Link>
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
      }}
    </GalleryContextConsumer>
  );
};

export default Favorites;
