import {
  ADD_SUGGESTION_ACTION,
  REMOVE_SUGGESTION_ACTION,
  RESET_SUGGESTIONS_ACTION,
} from '../types/suggestions';

export function addSuggestion(suggestion: string) {
  return {
    type: ADD_SUGGESTION_ACTION,
    payload: suggestion,
  };
}

export function removeSuggestion(suggestion: string) {
  return {
    type: REMOVE_SUGGESTION_ACTION,
    payload: suggestion,
  };
}

export function resetSuggestions() {
  return {
    type: RESET_SUGGESTIONS_ACTION,
  };
}
