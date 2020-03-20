import React, { createContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import {
  dispatchGiphySearchWrapper,
  search,
  searchMore
} from "../../actions/search";
import { updateSearchQuery } from "../../actions/searchParams";
import config from "../../config";
import { giphySearchParamsReducer } from "../../reducers/giphySearchParams";
import { giphySearchResultsReducer } from "../../reducers/giphySearchResults";
import { GalleryState } from "../../types/gallery";

const GalleryContext = createContext<GalleryState>({
  state: {
    giphySearchResults: config.defaults.defaultSearchResults,
    giphySearchParams: config.defaults.defaultSearchParams
  },
  dispatch: () => {}
});

const GalleryContextProvider: React.FC = ({ children }) => {
  const [giphySearchParams, dispatchGiphySearchParamsAction] = useReducer(
    giphySearchParamsReducer,
    config.defaults.defaultSearchParams
  );
  const { offset } = giphySearchParams;
  const [giphySearchResults, dispatchGiphySearchResultsAction] = useReducer(
    giphySearchResultsReducer,
    config.defaults.defaultSearchResults
  );
  const { pathname } = useLocation();
  const searchQuery = pathname ? pathname.slice(1) : "";
  const dispatchGiphySearchAction = dispatchGiphySearchWrapper(
    dispatchGiphySearchResultsAction
  );
  useEffect(() => {
    if (searchQuery) {
      dispatchGiphySearchParamsAction(updateSearchQuery(searchQuery));
      dispatchGiphySearchAction(search({ ...giphySearchParams, searchQuery }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      dispatchGiphySearchAction(searchMore(giphySearchParams));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <GalleryContext.Provider
      value={{
        state: { giphySearchParams, giphySearchResults },
        dispatch: dispatchGiphySearchParamsAction
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

const GalleryContextConsumer = GalleryContext.Consumer;

export { GalleryContext, GalleryContextProvider, GalleryContextConsumer };
