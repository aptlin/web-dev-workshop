import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { resetFavorites } from '../../actions/favorites';
import config from '../../config';
import { userFavoritesReducer } from '../../reducers/favorites';
import { UserFavoritesState } from '../../types/favorites';
import { useAuth0 } from '../Auth';
import { MoodieLocalStorage } from '../Storage';

const defaultFavorites = config.defaults.defaultFavorites;
const FavoritesContext = createContext<UserFavoritesState>({
  state: defaultFavorites,
  dispatch: () => {},
});

const storageType = config.constants.STORAGE_TYPE;

export const FavoritesContextProvider: React.FC = ({ children }) => {
  const { user } = useAuth0();
  const [userFavorites, dispatchUserFavorites] = useReducer(
    userFavoritesReducer,
    defaultFavorites,
  );
  useEffect(() => {
    if (user && storageType === 'local') {
      const { email } = user;
      MoodieLocalStorage.read(email!).then((userInfo) => {
        if (userInfo) {
          const { favorites } = userInfo;
          dispatchUserFavorites(
            resetFavorites(favorites ? favorites.liked : undefined),
          );
        }
      });
    }
  }, [user]);

  return (
    <FavoritesContext.Provider
      value={{
        state: userFavorites,
        dispatch: dispatchUserFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const FavoritesContextConsumer = FavoritesContext.Consumer;

export const useFavorites = () => useContext(FavoritesContext)!;
