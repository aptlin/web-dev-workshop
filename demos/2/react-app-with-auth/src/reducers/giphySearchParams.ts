import config from "../config";
import { Reducer } from "react";
import { GiphySearchParams, GiphySearchParamsAction } from "../types/giphy";
import {
  SEARCH_RESET_ACTION,
  UPDATE_SEARCH_QUERY_ACTION,
  UPDATE_SEARCH_OFFSET_ACTION
} from "../types/search";

const defaultSearchParams = config.defaults.defaultSearchParams;

export const giphySearchParamsReducer: Reducer<
  GiphySearchParams,
  GiphySearchParamsAction
> = (state, action) => {
  switch (action.type) {
    case SEARCH_RESET_ACTION:
      return { ...defaultSearchParams };

    case UPDATE_SEARCH_QUERY_ACTION:
      return { ...state, searchQuery: action.payload as string };

    case UPDATE_SEARCH_OFFSET_ACTION:
      return { ...state, offset: action.payload as number };

    default:
      return state;
  }
};
