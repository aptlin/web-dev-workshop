import * as Sentry from '@sentry/browser';
import { GiphyService } from '../services/Giphy';
import { ArchiveDispatch, ArchiveState } from '../types/gallery';
import {
  GiphyActionDispatch,
  GiphySearchAction,
  GiphySearchParams,
  GiphySearchPromiseAction,
} from '../types/giphy';
import {
  FULFILLED_SEARCH_ACTION,
  FULFILLED_SEARCH_MORE_ACTION,
  PENDING_SEARCH_ACTION,
  PENDING_SEARCH_MORE_ACTION,
  REJECTED_SEARCH_ACTION,
  REJECTED_SEARCH_MORE_ACTION,
  SEARCH_ACTION,
  SEARCH_MORE_ACTION,
  SEARCH_RESET_ACTION,
} from '../types/search';
import { updateSearchOffset } from './searchParams';

export const dispatchGiphySearchWrapper = (
  dispatch: GiphyActionDispatch<GiphySearchPromiseAction>,
) => {
  return (action: GiphySearchAction) => {
    switch (action.type) {
      case SEARCH_ACTION:
        const searchResultPromise = GiphyService.search(action.payload);
        dispatch({
          type: PENDING_SEARCH_ACTION,
          payload: null,
        });
        searchResultPromise
          .then((results) =>
            dispatch({
              type: FULFILLED_SEARCH_ACTION,
              payload: {
                ...results.data,
                searchQuery: action.payload.searchQuery,
              },
            }),
          )
          .catch((error) => {
            dispatch({ type: REJECTED_SEARCH_ACTION, payload: null });
            Sentry.captureException(error);
          });
        break;
      case SEARCH_MORE_ACTION:
        const searchMoreResultsPromise = GiphyService.search(action.payload);
        dispatch({
          type: PENDING_SEARCH_MORE_ACTION,
          payload: null,
        });
        searchMoreResultsPromise
          .then((results) =>
            dispatch({
              type: FULFILLED_SEARCH_MORE_ACTION,
              payload: results.data,
            }),
          )
          .catch((error) => {
            dispatch({ type: REJECTED_SEARCH_MORE_ACTION, payload: null });
            Sentry.captureException(error);
          });
        break;

      default:
        return;
    }
  };
};

export function search(searchParams: GiphySearchParams) {
  return {
    type: SEARCH_ACTION,
    payload: searchParams,
  };
}

export function searchMore(searchParams: GiphySearchParams) {
  return {
    type: SEARCH_MORE_ACTION,
    payload: searchParams,
  };
}

export function searchReset() {
  return {
    type: SEARCH_RESET_ACTION,
    payload: null,
  };
}

export function loadNextBatch(batchSize: number) {
  return (state: ArchiveState, dispatch: ArchiveDispatch) => {
    const { giphySearchResults, giphySearchParams } = state;
    const { pagination, isFetchingMore, isLoading } = giphySearchResults;

    const totalCount = pagination ? pagination.total_count : 0;

    if (isFetchingMore || isLoading) {
      return;
    }

    const offset = giphySearchParams.offset + batchSize;

    if (offset >= totalCount) {
      return;
    }
    giphySearchParams.offset = offset;

    dispatch(updateSearchOffset(offset));

    return;
  };
}
