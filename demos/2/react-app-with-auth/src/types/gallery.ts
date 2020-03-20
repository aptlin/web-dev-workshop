import {
  GiphySearchResult,
  GiphySearchParams,
  GiphyActionDispatch,
  GiphySearchParamsAction
} from "./giphy";

export interface ArchiveState {
  giphySearchResults: GiphySearchResult;
  giphySearchParams: GiphySearchParams;
}

export type ArchiveDispatch = GiphyActionDispatch<GiphySearchParamsAction>;

export interface GalleryState {
  state: ArchiveState;
  dispatch: ArchiveDispatch;
}
