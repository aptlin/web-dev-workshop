import { UserFavorites } from './favorites';

export type LOCAL_STORAGE = 'local';
export type STORAGE_TYPE = LOCAL_STORAGE;

export interface MoodieStorageObject {
  favorites?: UserFavorites;
}
