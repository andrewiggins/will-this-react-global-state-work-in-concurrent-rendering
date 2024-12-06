import { useCallback } from 'react';
import { legacy_createStore } from 'redux-v4';
import { Provider, useSelector, useDispatch } from 'react-redux-v7';

import {
  reducer,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

const store = legacy_createStore(reducer);

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
