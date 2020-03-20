import React, { createContext, useReducer, useContext } from "react";
import config from "../../config";
import { userFavoritesReducer } from "../../reducers/favorites";
import { UserFavoritesState } from "../../types/favorites";

const defaultFavorites = config.defaults.defaultFavorites;
const FavoritesContext = createContext<UserFavoritesState>({
  state: defaultFavorites,
  dispatch: () => {}
});

export const FavoritesContextProvider: React.FC = ({ children }) => {
  const [userFavorites, dispatchUserFavorites] = useReducer(
    userFavoritesReducer,
    defaultFavorites
  );

  return (
    <FavoritesContext.Provider
      value={{
        state: userFavorites,
        dispatch: dispatchUserFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const FavoritesContextConsumer = FavoritesContext.Consumer;

export const useFavorites = () => useContext(FavoritesContext)!;
