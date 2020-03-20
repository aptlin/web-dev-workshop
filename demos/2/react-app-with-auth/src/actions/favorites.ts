import {
  ADD_FAVORITE_ACTION,
  RESET_FAVORITES_ACTION,
  REMOVE_FAVORITE_ACTION
} from "../types/favorites";

export function addFavorite(favorite: string) {
  return {
    type: ADD_FAVORITE_ACTION,
    payload: favorite
  };
}

export function removeFavorite(favorite: string) {
  return {
    type: REMOVE_FAVORITE_ACTION,
    payload: favorite
  };
}

export function resetFavorites() {
  return {
    type: RESET_FAVORITES_ACTION
  };
}
