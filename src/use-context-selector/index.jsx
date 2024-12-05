import { useCallback, useReducer } from 'react';
import {
  createContext,
  useContextSelector,
  useContextUpdate,
} from 'use-context-selector';

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
  const update = useContextUpdate(context);
  const dispatch = useContextSelector(context, (v) => v[1]);
  return useCallback(
    () => update(() => dispatch(incrementAction)),
    [update, dispatch],
  );
};

const useDouble = () => {
  const update = useContextUpdate(context);
  const dispatch = useContextSelector(context, (v) => v[1]);
  return useCallback(
    () => update(() => dispatch(doubleAction)),
    [update, dispatch],
  );
};

const Root = ({ children }) => (
  <context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </context.Provider>
);

renderApp(useCount, useIncrement, useDouble, Root);
