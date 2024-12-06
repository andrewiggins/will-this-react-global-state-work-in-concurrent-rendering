import { useDeferredValue, useRef, useState, useTransition } from 'react';

import {
  syncBlock,
  reducer,
  incrementAction,
  doubleAction,
  NUM_CHILD_COMPONENTS,
  useCheckTearing,
  selectCount,
} from '../common';

/**
 * @import {State, Action} from "../common"
 * @import {Reducer, Store, Dispatch} from "redux-v3";
 *
 * Simplified redux types:
 * @typedef {(reducer: Reducer<State>) => Store<State>} CreateStore
 * @typedef {React.FC<{ store: Store; children: React.ReactNode; }>} Provider
 * @typedef {(mapStateToProps: MapStateToProps, mapDispatchToProps?: MapDispatchToProps) => (component: React.FC<StateProps & DispatchProps>) => React.FC} Connect
 */

const ids = [...Array(NUM_CHILD_COMPONENTS).keys()];

/**
 * @typedef {{count: number}} StateProps
 * @typedef {(state: State) => StateProps} MapStateToProps
 * @type {MapStateToProps}
 */
function mapStateToProps(state) {
  console.log('mapStateToProps', state);
  return { count: selectCount(state) };
}

/**
 * @typedef {{increment(): void; doDouble(): void;}} DispatchProps
 * @typedef {(dispatch: Dispatch<Action>) => DispatchProps} MapDispatchToProps
 * @type {MapDispatchToProps}
 */
function mapDispatchToProps(dispatch) {
  return {
    increment() {
      console.group('increment');
      dispatch(incrementAction);
      console.groupEnd();
    },
    doDouble() {
      console.group('doDouble');
      dispatch(doubleAction);
      console.groupEnd();
    },
  };
}

/**
 * @param {{ createStore: CreateStore; connect: Connect; Provider: Provider }} props
 * @returns {React.FC<{}>}
 */
export function createConnectApp({ createStore, connect, Provider }) {
  const store = createStore(reducer);

  const Counter = connect(mapStateToProps)(({ count }) => {
    console.log('Counter', count);
    syncBlock();
    return <div className="count">{count}</div>;
  });

  const DeferredCounter = connect(mapStateToProps)(({ count }) => {
    console.log('DeferredCounter', count);
    const deferredCount = useDeferredValue(count);
    syncBlock();
    return <div className="count">{deferredCount}</div>;
  });

  const Main = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(({ count, increment, doDouble }) => {
    console.log('Main', count);

    const [isPending, startTransition] = useTransition();
    const [mode, setMode] = useState('');
    const transitionHide = () => {
      startTransition(() => setMode(''));
    };
    const transitionShowCounter = () => {
      startTransition(() => setMode('counter'));
    };
    const transitionShowDeferred = () => {
      startTransition(() => setMode('deferred'));
    };
    const deferredCount = useDeferredValue(count);
    useCheckTearing();
    const transitionIncrement = () => {
      console.group('transitionIncrement');
      startTransition(increment);
      console.groupEnd();
    };
    /** @type {React.MutableRefObject<any>} */
    const timer = useRef();
    const stopAutoIncrement = () => {
      clearInterval(timer.current);
    };
    const startAutoIncrement = () => {
      stopAutoIncrement();
      timer.current = setInterval(increment, 50);
    };
    return (
      <div>
        <button type="button" id="transitionHide" onClick={transitionHide}>
          Hide in transition
        </button>
        <button
          type="button"
          id="transitionShowCounter"
          onClick={transitionShowCounter}
        >
          Show counter in transition
        </button>
        <button
          type="button"
          id="transitionShowDeferred"
          onClick={transitionShowDeferred}
        >
          Show deferred counter in transition
        </button>
        <button type="button" id="normalIncrement" onClick={increment}>
          Increment count normally
        </button>
        <button type="button" id="normalDouble" onClick={doDouble}>
          Double count normally
        </button>
        <button
          type="button"
          id="transitionIncrement"
          onClick={transitionIncrement}
        >
          Increment count in transition
        </button>
        <button
          type="button"
          id="stopAutoIncrement"
          onClick={stopAutoIncrement}
        >
          Stop auto incrementing count
        </button>
        <button
          type="button"
          id="startAutoIncrement"
          onClick={startAutoIncrement}
        >
          Start auto incrementing count
        </button>
        <span id="pending">{isPending && 'Pending...'}</span>
        <h1>Counters</h1>
        {mode === 'counter' && ids.map((id) => <Counter key={id} />)}
        {mode === 'deferred' && ids.map((id) => <DeferredCounter key={id} />)}
        <h1>Main</h1>
        <div id="mainCount" className="count">
          {mode === 'deferred' ? deferredCount : count}
        </div>
      </div>
    );
  });

  const App = () => (
    <Provider store={store}>
      <Main />
    </Provider>
  );

  return App;
}
