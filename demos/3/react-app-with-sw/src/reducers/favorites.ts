import { Reducer } from 'react';
import {
  ADD_FAVORITE_ACTION,
  FavoritesAction,
  REMOVE_FAVORITE_ACTION,
  UserFavorites,
  RESET_FAVORITES_ACTION,
} from '../types/favorites';
import config from '../config';

const defaultUserFavorites: UserFavorites = config.defaults.defaultFavorites;
export const userFavoritesReducer: Reducer<UserFavorites, FavoritesAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case RESET_FAVORITES_ACTION:
      return { ...defaultUserFavorites };

    case ADD_FAVORITE_ACTION:
      if (action.payload) {
        const liked = new Set(state.liked);
        liked.add(action.payload);
        return { ...state, liked: Array.from(liked) };
      } else {
        return state;
      }

    case REMOVE_FAVORITE_ACTION:
      const index = state.liked.indexOf(action.payload!);
      if (index > -1) {
        return {
          ...state,
          liked: [
            ...state.liked.slice(0, index),
            ...state.liked.slice(index + 1),
          ],
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};
