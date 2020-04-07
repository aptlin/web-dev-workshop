import { Reducer } from "react";
import config from "../config";
import { GiphySearchPromiseAction, GiphySearchResult } from "../types/giphy";
import {
  FULFILLED_SEARCH_ACTION,
  FULFILLED_SEARCH_MORE_ACTION,
  PENDING_SEARCH_ACTION,
  PENDING_SEARCH_MORE_ACTION,
  REJECTED_SEARCH_ACTION,
  REJECTED_SEARCH_MORE_ACTION,
  SEARCH_RESET_ACTION
} from "../types/search";

const defaultSearchResults = config.defaults
  .defaultSearchResults as GiphySearchResult;

export const giphySearchResultsReducer: Reducer<
  GiphySearchResult,
  GiphySearchPromiseAction
> = (state, action) => {
  const payloadData = action.payload || defaultSearchResults;

  switch (action.type) {
    case SEARCH_RESET_ACTION:
      return { ...defaultSearchResults };

    case PENDING_SEARCH_ACTION:
      return {
        ...state,
        isLoading: true,
        isFetchingMore: false,
        error: false
      };

    case PENDING_SEARCH_MORE_ACTION:
      return {
        ...state,
        isLoading: false,
        isFetchingMore: true,
        error: false
      };

    case FULFILLED_SEARCH_ACTION:
      return {
        ...state,
        searchQuery: payloadData.searchQuery,
        data: payloadData.data,
        pagination: payloadData.pagination,
        meta: payloadData.meta,
        isLoading: false,
        isFetchingMore: false,
        error: false
      };

    case FULFILLED_SEARCH_MORE_ACTION:
      return {
        ...state,
        data: state.data.concat(payloadData.data),
        pagination: payloadData.pagination,
        meta: payloadData.meta,
        isLoading: false,
        isFetchingMore: false,
        error: false
      };

    case REJECTED_SEARCH_ACTION:
      return {
        ...defaultSearchResults,
        isLoading: false,
        isFetchingMore: false,
        error: true
      };

    case REJECTED_SEARCH_MORE_ACTION:
      return {
        ...state,
        isLoading: false,
        isFetchingMore: false,
        error: true
      };

    default:
      return state;
  }
};
