import { Reducer } from 'react';
import config from '../config';
import {
  UserSuggestions,
  SuggestionsAction,
  RESET_SUGGESTIONS_ACTION,
  ADD_SUGGESTION_ACTION,
  REMOVE_SUGGESTION_ACTION,
} from '../types/suggestions';

const defaultUserSuggestions: UserSuggestions =
  config.defaults.defaultSuggestions;
export const userSuggestionsReducer: Reducer<
  UserSuggestions,
  SuggestionsAction
> = (state, action) => {
  switch (action.type) {
    case RESET_SUGGESTIONS_ACTION:
      return { ...defaultUserSuggestions };

    case ADD_SUGGESTION_ACTION:
      if (action.payload) {
        const liked = new Set(state.suggestions);
        liked.add(action.payload);
        return { ...state, liked: Array.from(liked) };
      } else {
        return state;
      }

    case REMOVE_SUGGESTION_ACTION:
      const index = state.suggestions.indexOf(action.payload!);
      if (index > -1) {
        return {
          ...state,
          liked: [
            ...state.suggestions.slice(0, index),
            ...state.suggestions.slice(index + 1),
          ],
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};
