import config from '../config';
const FAVORITES_ACTION_TYPES = config.actions.FAVORITES_ACTION_TYPES;

export const ADD_FAVORITE_ACTION = FAVORITES_ACTION_TYPES.ADD_FAVORITE;
export const REMOVE_FAVORITE_ACTION = FAVORITES_ACTION_TYPES.REMOVE_FAVORITE;
export const RESET_FAVORITES_ACTION = FAVORITES_ACTION_TYPES.RESET_FAVORITES;

export interface UserFavorites {
  liked: Set<string>;
  usedToLike: Set<string>;
}

export type FavoriteActionType =
  | typeof RESET_FAVORITES_ACTION
  | typeof ADD_FAVORITE_ACTION
  | typeof REMOVE_FAVORITE_ACTION;

export interface FavoritesAction {
  type: FavoriteActionType;
  payload?: string;
}

export type FavoritesDispatch<T = FavoritesAction> = (action: T) => void;

export interface UserFavoritesState {
  state: UserFavorites;
  dispatch: FavoritesDispatch;
}
