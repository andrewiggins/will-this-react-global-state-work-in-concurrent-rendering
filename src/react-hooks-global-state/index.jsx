import { createStore } from 'react-hooks-global-state';

import {
  reducer,
  initialState,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

const { dispatch, useGlobalState } = createStore(reducer, initialState);

const useCount = () => {
  const [count] = useGlobalState('count');
  return count;
};

const useIncrement = () => () => dispatch(incrementAction);

const useDouble = () => () => dispatch(doubleAction);

renderApp(useCount, useIncrement, useDouble);
