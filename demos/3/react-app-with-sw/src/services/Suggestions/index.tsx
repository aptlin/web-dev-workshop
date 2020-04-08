import React, { createContext, useReducer, useContext } from 'react';
import config from '../../config';
import { UserSuggestionsState } from '../../types/suggestions';
import { userSuggestionsReducer } from '../../reducers/suggestions';

const defaultSuggestions = config.defaults.defaultSuggestions;
const SuggestionsContext = createContext<UserSuggestionsState>({
  state: defaultSuggestions,
  dispatch: () => {},
});

export const SuggestionsContextProvider: React.FC = ({ children }) => {
  const [userSuggestions, dispatchUserSuggestions] = useReducer(
    userSuggestionsReducer,
    defaultSuggestions,
  );

  return (
    <SuggestionsContext.Provider
      value={{
        state: userSuggestions,
        dispatch: dispatchUserSuggestions,
      }}
    >
      {children}
    </SuggestionsContext.Provider>
  );
};

export const SuggestionsContextConsumer = SuggestionsContext.Consumer;

export const useSuggestions = () => useContext(SuggestionsContext)!;
