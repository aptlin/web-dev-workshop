import {
  UPDATE_SEARCH_QUERY_ACTION,
  UPDATE_SEARCH_OFFSET_ACTION
} from "../types/search";

export function updateSearchQuery(searchQuery: string) {
  return {
    type: UPDATE_SEARCH_QUERY_ACTION,
    payload: searchQuery
  };
}

export function updateSearchOffset(offset: number) {
  return {
    type: UPDATE_SEARCH_OFFSET_ACTION,
    payload: offset
  };
}
