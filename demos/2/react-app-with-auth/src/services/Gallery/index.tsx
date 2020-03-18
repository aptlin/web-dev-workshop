import axios from "axios";
import React, { createContext, Reducer, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import config from "../../config";

const GalleryContext = createContext<GalleryState>({
  state: {},
  dispatch: () => {}
});

const archiveReducer: Reducer<ArchiveState, ArchiveAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "update":
      return action.data;
    case "clear":
      return {};
    default:
      throw new Error();
  }
};

const GalleryContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(archiveReducer, {});
  const dispatchProxy: GalleryDispatch = React.useCallback(
    action => {
      switch (action.type) {
        case "fetch":
          const { searchQuery, limit, offset, rating, lang } = action.data;
          if (searchQuery.length > 0) {
            const url = config.constants.GIPHY_API_SEARCH;
            return axios
              .get(url, {
                timeout: config.constants.HTTP_REQUEST_TIMEOUT,
                params: {
                  api_key: config.constants.GIPHY_API_KEY,
                  q: searchQuery,
                  limit,
                  offset,
                  rating,
                  lang
                }
              })
              .then(results => {
                const entry: ArchiveState = {};
                entry[searchQuery] = {
                  title: searchQuery,
                  experiences: [],
                  isFavorite: false
                };
                for (const result of results.data.data) {
                  entry[searchQuery].experiences.push({
                    url: result.images.fixed_width.url,
                    height: result.images.fixed_width.height,
                    width: result.images.fixed_width.width,
                    title: result.title
                  });
                }
                return dispatch({
                  type: "update",
                  data: {
                    ...state,
                    ...entry
                  }
                });
              });
          }
          break;
        default:
          return dispatch(action as ArchiveAction);
      }
    },
    [state, dispatch]
  );
  const { searchQuery } = useParams();
  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      const action: GalleryAction = {
        type: "fetch",
        data: { ...config.defaultQuery, searchQuery }
      };
      dispatchProxy(action);
    }
  }, [searchQuery, dispatchProxy]);
  return (
    <GalleryContext.Provider value={{ state, dispatch: dispatchProxy }}>
      {children}
    </GalleryContext.Provider>
  );
};

const GalleryContextConsumer = GalleryContext.Consumer;

export { GalleryContext, GalleryContextProvider, GalleryContextConsumer };
