import { createStore } from 'react-hooks-global-state';

import {
  reducer,
  initialState,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

const { dispatch, useStoreState } = createStore(reducer, initialState);

const useCount = () => {
  return useStoreState('count');
};

const useIncrement = () => () => dispatch(incrementAction);

const useDouble = () => () => dispatch(doubleAction);

renderApp(useCount, useIncrement, useDouble);
