import { Subject, asapScheduler } from 'rxjs';
import { map, scan, observeOn } from 'rxjs/operators';
import { bind } from '@react-rxjs/core';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

const actions$ = new Subject();

const [useCount] = bind(
  actions$.pipe(
    observeOn(asapScheduler),
    scan(reducer, initialState),
    map(selectCount),
  ),
  selectCount(initialState),
);

const useIncrement = () => () => actions$.next(incrementAction);
const useDouble = () => () => actions$.next(doubleAction);

renderApp(useCount, useIncrement, useDouble);
