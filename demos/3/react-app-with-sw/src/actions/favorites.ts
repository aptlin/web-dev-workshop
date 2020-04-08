import {
  ADD_FAVORITE_ACTION,
  RESET_FAVORITES_ACTION,
  REMOVE_FAVORITE_ACTION,
  FavoritesAction,
} from '../types/favorites';

export function addFavorite(favorite: string, email?: string): FavoritesAction {
  return {
    type: ADD_FAVORITE_ACTION,
    payload: favorite,
    email,
  };
}

export function removeFavorite(
  favorite: string,
  email?: string,
): FavoritesAction {
  return {
    type: REMOVE_FAVORITE_ACTION,
    payload: favorite,
    email,
  };
}

export function resetFavorites(
  favorites?: string[],
  email?: string,
): FavoritesAction {
  return {
    type: RESET_FAVORITES_ACTION,
    payload: favorites,
    email,
  };
}
