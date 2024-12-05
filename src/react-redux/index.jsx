import React, { useCallback } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

import {
  reducer,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

const store = createStore(reducer);

const useCount = () => useSelector(selectCount);

const useIncrement = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

const Root = ({ children }) => <Provider store={store}>{children}</Provider>;

renderApp(useCount, useIncrement, useDouble, Root);
