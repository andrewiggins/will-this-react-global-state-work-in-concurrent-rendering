import React, { useCallback, useReducer } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

/**
 * @import {Dispatch} from 'react'
 * @import { State, Action } from '../common'
 */

/**
 * @typedef {[State, Dispatch<Action>]} Value
 * @type {import('use-context-selector').Context<Value>}
 */
const context = createContext(/** @type {any} */ (null));

const useCount = () => useContextSelector(context, (v) => selectCount(v[0]));

const useIncrement = () => {
  const dispatch = useContextSelector(context, (v) => v[1]);
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const dispatch = useContextSelector(context, (v) => v[1]);
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

const Root = ({ children }) => (
  <context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </context.Provider>
);

renderApp(useCount, useIncrement, useDouble, Root);
