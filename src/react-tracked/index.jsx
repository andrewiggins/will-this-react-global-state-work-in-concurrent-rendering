import React, { useCallback } from 'react';
import { createContainer } from 'react-tracked';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

/**
 * @import { State, Action } from "../common"
 * @type {() => [State, import('react').Dispatch<Action>]}
 */
const useValue = () => React.useReducer(reducer, initialState);

const {
  Provider: Root,
  useSelector,
  useUpdate: useDispatch,
} = createContainer(useValue, { concurrentMode: true });

const useCount = () => useSelector(selectCount);

const useIncrement = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

renderApp(useCount, useIncrement, useDouble, Root);
