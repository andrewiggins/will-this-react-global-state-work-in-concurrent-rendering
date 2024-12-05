import { useCallback } from 'react';
import { signal } from '@preact/signals-react';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

// Note: this does not represent idiomatic usage of signals. Typically, you would
// put the primitive value in the signal instead of a boxed object. Then manipulate
// the value directly instead of using a reducer. But we are doing this to keep the
// code similar to the other examples in this repo.

const count = signal(initialState);

const useCount = () => {
  return selectCount(count.value);
};

const useIncrement = () => {
  return useCallback(() => {
    count.value = reducer(count.value, incrementAction);
  }, []);
};

const useDouble = () => {
  return useCallback(() => {
    count.value = reducer(count.value, doubleAction);
  }, []);
};

renderApp(useCount, useIncrement, useDouble);
