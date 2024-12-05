import React, { createContext, useContext, useCallback } from 'react';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

/**
 * @import { Context, Dispatch } from "react";
 * @import { State, Action } from "../common"
 */

/** @type {Context<State>} */
const StateCtx = createContext(/** @type {any} */ (null));
/** @type {Context<Dispatch<Action>>} */
const DispatchCtx = createContext(/** @type {any} */ (null));

const useCount = () => selectCount(useContext(StateCtx));

const useIncrement = () => {
  const dispatch = useContext(DispatchCtx);
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const dispatch = useContext(DispatchCtx);
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

const Root = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <DispatchCtx.Provider value={dispatch}>
      <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
    </DispatchCtx.Provider>
  );
};

renderApp(useCount, useIncrement, useDouble, Root);
