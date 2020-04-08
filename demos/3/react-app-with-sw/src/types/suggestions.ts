import config from '../config';
const SUGGESTIONS_ACTION_TYPES = config.actions.SUGGESTIONS_ACTION_TYPES;

export const ADD_SUGGESTION_ACTION = SUGGESTIONS_ACTION_TYPES.ADD_SUGGESTION;
export const REMOVE_SUGGESTION_ACTION =
  SUGGESTIONS_ACTION_TYPES.REMOVE_SUGGESTION;
export const RESET_SUGGESTIONS_ACTION =
  SUGGESTIONS_ACTION_TYPES.RESET_SUGGESTIONS;

export interface UserSuggestions {
  suggestions: string[];
}

export type SuggestionActionType =
  | typeof RESET_SUGGESTIONS_ACTION
  | typeof ADD_SUGGESTION_ACTION
  | typeof REMOVE_SUGGESTION_ACTION;

export interface SuggestionsAction {
  type: SuggestionActionType;
  payload?: string;
}

export type SuggestionsDispatch<T = SuggestionsAction> = (action: T) => void;

export interface UserSuggestionsState {
  state: UserSuggestions;
  dispatch: SuggestionsDispatch;
}
