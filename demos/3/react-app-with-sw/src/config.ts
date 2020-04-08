import { GiphySearchResult, GiphySearchParams } from './types/giphy';
import { UserFavorites } from './types/favorites';
import { STORAGE_TYPE } from './types/storage';

const SEARCH_BATCH_SIZE = 25;
const config = {
  defaults: {
    defaultSearchParams: {
      searchQuery: '',
      limit: SEARCH_BATCH_SIZE,
      offset: 0,
      rating: 'G',
      lang: 'en',
    } as GiphySearchParams,
    defaultSearchResults: {
      searchQuery: '',
      data: [],
      isLoading: false,
      isFetchingMore: false,
      error: false,
    } as GiphySearchResult,
    defaultFavorites: {
      liked: [],
    } as UserFavorites,
    defaultSuggestions: {
      suggestions: [
        'joy',
        'gratitude',
        'serenity',
        'interest',
        'hope',
        'amusement',
        'inspiration',
        'awe',
        'love',
      ],
    },
    defaultLocalforageConfig: {
      name: 'Moodie Local Storage',
      storeName: 'User Info',
    },
  },
  constants: {
    GIPHY_API_KEY: process.env.REACT_APP_GIPHY_KEY || '',
    GIPHY_API_SEARCH: 'https://api.giphy.com/v1/gifs/search',
    AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN || '',
    AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    AUTH0_AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE || '',
    HTTP_REQUEST_TIMEOUT: Number.parseInt(
      process.env.REACT_APP_HTTP_REQUEST_TIMEOUT || '100000',
    ),
    GA_KEY: process.env.REACT_APP_GA_KEY || '',
    SENTRY_DOMAIN: process.env.REACT_APP_SENTRY_DOMAIN || '',
    ACTIVATION_DISTANCE: 50,
    THROTTLING_PERIOD: 500,
    NUM_COLUMNS: 3,
    SEARCH_BATCH_SIZE,
    STORAGE_TYPE: (process.env.REACT_APP_STORAGE || 'local') as STORAGE_TYPE,
  },
  interface: {
    searchPlaceholder: 'What to experience?',
  },
  actions: {
    SEARCH_ACTION_TYPES: {
      SEARCH: 'SEARCH',
      SEARCH_MORE: 'SEARCH_MORE',
      SEARCH_RESET: 'SEARCH_RESET',
    },
    SEARCH_PARAMS_ACTION_TYPES: {
      UPDATE_SEARCH_QUERY: 'UPDATE_SEARCH_QUERY',
      UPDATE_SEARCH_OFFSET: 'UPDATE_SEARCH_OFFSET',
    },
    ACTION_STATES: {
      PENDING: 'PENDING',
      FULFILLED: 'FULFILLED',
      REJECTED: 'REJECTED',
    },
    FAVORITES_ACTION_TYPES: {
      ADD_FAVORITE: 'ADD_FAVORITE',
      REMOVE_FAVORITE: 'REMOVE_FAVORITE',
      RESET_FAVORITES: 'RESET_FAVORITES',
    },
    SUGGESTIONS_ACTION_TYPES: {
      ADD_SUGGESTION: 'ADD_SUGGESTION',
      REMOVE_SUGGESTION: 'REMOVE_SUGGESTION',
      RESET_SUGGESTIONS: 'RESET_SUGGESTIONS',
    },
  },
};

export default config;
