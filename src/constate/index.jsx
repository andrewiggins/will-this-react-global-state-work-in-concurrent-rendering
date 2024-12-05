import React, { useCallback } from 'react';
import createUseContext from 'constate';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

/**
 * @import { Dispatch } from "react";
 * @import { State, Action } from "../common"
 * @type {() => [State, Dispatch<Action>]}
 */
const useValue = () => React.useReducer(reducer, initialState);
const [Root, useValueContext] = createUseContext(useValue);

const useCount = () => {
  const [state] = useValueContext();
  return selectCount(state);
};

const useIncrement = () => {
  const [, dispatch] = useValueContext();
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const [, dispatch] = useValueContext();
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

renderApp(useCount, useIncrement, useDouble, Root);
