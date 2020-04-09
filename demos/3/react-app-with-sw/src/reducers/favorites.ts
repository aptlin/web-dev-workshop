import { Reducer } from 'react';
import {
  ADD_FAVORITE_ACTION,
  FavoritesAction,
  REMOVE_FAVORITE_ACTION,
  UserFavorites,
  RESET_FAVORITES_ACTION,
} from '../types/favorites';
import config from '../config';
import { MoodieLocalStorage } from '../services/Storage';

const defaultUserFavorites: UserFavorites = config.defaults.defaultFavorites;

export const userFavoritesReducer: Reducer<UserFavorites, FavoritesAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case RESET_FAVORITES_ACTION:
      if (action.payload) {
        return { liked: action.payload as string[] };
      } else {
        return { ...defaultUserFavorites };
      }

    case ADD_FAVORITE_ACTION:
      if (action.payload) {
        const likedSet = new Set(state.liked);
        likedSet.add(action.payload as string);
        const liked = Array.from(likedSet);
        if (action.email) {
          MoodieLocalStorage.update(action.email, { favorites: { liked } });
        }
        return { ...state, liked };
      } else {
        return state;
      }

    case REMOVE_FAVORITE_ACTION:
      const index = state.liked.indexOf(action.payload as string);
      if (index > -1) {
        const liked = [
          ...state.liked.slice(0, index),
          ...state.liked.slice(index + 1),
        ];
        if (action.email) {
          MoodieLocalStorage.update(action.email, { favorites: { liked } });
        }
        return {
          ...state,
          liked,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};
