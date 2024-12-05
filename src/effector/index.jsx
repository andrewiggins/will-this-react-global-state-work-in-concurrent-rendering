import { createStore, createEvent } from 'effector';
import { useStore } from 'effector-react';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

/** @type {import('effector').Event<import('../common').Action>} */
const dispatch = createEvent();
const $store = createStore(initialState).on(dispatch, reducer);

const $count = $store.map((value) => selectCount(value));

const useCount = () => useStore($count);

const useIncrement = () => () => dispatch(incrementAction);

const useDouble = () => () => dispatch(doubleAction);

renderApp(useCount, useIncrement, useDouble);
