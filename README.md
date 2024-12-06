# Will this React global state work in concurrent rendering?

Test tearing and branching in React concurrent rendering

- [Discussion in React 18 WG](https://github.com/reactwg/react-18/discussions/116)

## Introduction

React 18 comes with a new feature called "concurrent rendering".
With global state, there's a theoretical issue called "tearing"
that might occur in React concurrent rendering.

Let's test the behavior!

## What is tearing?

- [What is tearing in React 18 WG](https://github.com/reactwg/react-18/discussions/69)
- [Stack Overflow](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux)
- [Talk by Mark Erikson](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&t=933s)
- [Talk by Flarnie Marchan](https://www.youtube.com/watch?v=V1Ly-8Z1wQA&t=1079s)
- Some other resources
  - https://github.com/reactjs/rfcs/pull/147
  - https://gist.github.com/bvaughn/054b82781bec875345bd85a5b1344698

## What is branching?

- Old resources
  - https://reactjs.org/docs/concurrent-mode-intro.html

## How does it work?

A small app is implemented with each library.
The state has one count.
The app shows the count in fifty components.

There's a button outside of React and
if it's clicked it will trigger state mutation.
This is to emulate mutating an external state outside of React,
for example updating state by Redux middleware.

The render has intentionally expensive computation.
If the mutation happens during rendering with in a tree,
there could be an inconsistency in the state.
If it finds the inconsistency, the test will fail.

## How to run

```bash
git clone https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-rendering.git
cd will-this-react-global-state-work-in-concurrent-rendering
yarn install
yarn run build-all
yarn run jest
```

To automatically run tests and update the README.md on OSX:

```
yarn jest:json
yarn jest:update
```

## Screencast (old one with react-redux v7. v8 works great.)

<img src="https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif" alt="Preview" width="350" />

## Test scenario

- With useTransition
  - Level 1
    - 1: No tearing finally on update
    - 2: No tearing finally on mount
  - Level 2
    - 3: No tearing temporarily on update
    - 4: No tearing temporarily on mount
  - Level 3
    - 5: Can interrupt render (time slicing)
    - 6: Can branch state (wip state)
- With useDeferredValue
  - Level 1
    - 7: No tearing finally on update
    - 8: No tearing finally on mount
  - Level 2
    - 9: No tearing temporarily on update
    - 10: No tearing temporarily on mount

## Results

<details>
<summary>Raw Output</summary>

```
   With useTransition
     Level 1
       ✓ No tearing finally on update (4841 ms)
       ✓ No tearing finally on mount (6684 ms)
     Level 2
       ✓ No tearing temporarily on update (8966 ms)
       ✓ No tearing temporarily on mount (7640 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3777 ms)
       ✓ Can branch state (wip state) (5398 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9827 ms)
       ✓ No tearing finally on mount (6676 ms)
     Level 2
       ✓ No tearing temporarily on update (14856 ms)
       ✓ No tearing temporarily on mount (6671 ms)
 react-redux-hooks
   With useTransition
     Level 1
       ✓ No tearing finally on update (8160 ms)
       ✓ No tearing finally on mount (4742 ms)
     Level 2
       ✓ No tearing temporarily on update (13193 ms)
       ✓ No tearing temporarily on mount (4735 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8142 ms)
       ✕ Can branch state (wip state) (6825 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9944 ms)
       ✓ No tearing finally on mount (4708 ms)
     Level 2
       ✓ No tearing temporarily on update (14859 ms)
       ✓ No tearing temporarily on mount (4673 ms)
 react-redux-v8-hooks
   With useTransition
     Level 1
       ✓ No tearing finally on update (8217 ms)
       ✓ No tearing finally on mount (4668 ms)
     Level 2
       ✓ No tearing temporarily on update (13127 ms)
       ✓ No tearing temporarily on mount (4667 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8118 ms)
       ✕ Can branch state (wip state) (6786 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9864 ms)
       ✓ No tearing finally on mount (4704 ms)
     Level 2
       ✓ No tearing temporarily on update (14869 ms)
       ✓ No tearing temporarily on mount (4656 ms)
 react-redux-v7-hooks
   With useTransition
     Level 1
       ✓ No tearing finally on update (4745 ms)
       ✓ No tearing finally on mount (7588 ms)
     Level 2
       ✕ No tearing temporarily on update (8835 ms)
       ✕ No tearing temporarily on mount (6562 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3834 ms)
       ✕ Can branch state (wip state) (3070 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9854 ms)
       ✓ No tearing finally on mount (6632 ms)
     Level 2
       ✓ No tearing temporarily on update (14868 ms)
       ✕ No tearing temporarily on mount (6620 ms)
 react-redux-connect
   With useTransition
     Level 1
       ✓ No tearing finally on update (8250 ms)
       ✓ No tearing finally on mount (4682 ms)
     Level 2
       ✕ No tearing temporarily on update (13257 ms)
       ✓ No tearing temporarily on mount (4694 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8287 ms)
       ✕ Can branch state (wip state) (6892 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11624 ms)
       ✓ No tearing finally on mount (4695 ms)
     Level 2
       ✓ No tearing temporarily on update (16651 ms)
       ✓ No tearing temporarily on mount (4659 ms)
 react-redux-v8-connect
   With useTransition
     Level 1
       ✓ No tearing finally on update (8298 ms)
       ✓ No tearing finally on mount (4737 ms)
     Level 2
       ✕ No tearing temporarily on update (13361 ms)
       ✓ No tearing temporarily on mount (4716 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8339 ms)
       ✕ Can branch state (wip state) (6885 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11634 ms)
       ✓ No tearing finally on mount (4694 ms)
     Level 2
       ✓ No tearing temporarily on update (16625 ms)
       ✓ No tearing temporarily on mount (4670 ms)
 react-redux-v7-connect
   With useTransition
     Level 1
       ✓ No tearing finally on update (8207 ms)
       ✓ No tearing finally on mount (6689 ms)
     Level 2
       ✕ No tearing temporarily on update (13271 ms)
       ✕ No tearing temporarily on mount (6653 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8287 ms)
       ✕ Can branch state (wip state) (6852 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10662 ms)
       ✓ No tearing finally on mount (5677 ms)
     Level 2
       ✓ No tearing temporarily on update (14742 ms)
       ✕ No tearing temporarily on mount (6678 ms)
 react-redux-v5-connect
   With useTransition
     Level 1
       ✓ No tearing finally on update (8298 ms)
       ✓ No tearing finally on mount (4830 ms)
     Level 2
       ✕ No tearing temporarily on update (13297 ms)
       ✕ No tearing temporarily on mount (6683 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8281 ms)
       ✕ Can branch state (wip state) (6916 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9887 ms)
       ✓ No tearing finally on mount (5710 ms)
     Level 2
       ✓ No tearing temporarily on update (14975 ms)
       ✕ No tearing temporarily on mount (5647 ms)
 preact-signals
   With useTransition
     Level 1
       ✓ No tearing finally on update (8135 ms)
       ✓ No tearing finally on mount (4664 ms)
     Level 2
       ✓ No tearing temporarily on update (13182 ms)
       ✓ No tearing temporarily on mount (4670 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8131 ms)
       ✕ Can branch state (wip state) (6815 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9778 ms)
       ✓ No tearing finally on mount (4681 ms)
     Level 2
       ✓ No tearing temporarily on update (14841 ms)
       ✓ No tearing temporarily on mount (4673 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
	<tr>
		<th><a href="https://react.dev/">raw react state</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
	</tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux-hooks</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
	</tr>
	<tr>
		<th><a href="https://www.npmjs.com/package/react-redux/v/8.1.3">react-redux-v8-hooks</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
	</tr>
	<tr>
		<th><a href="https://www.npmjs.com/package/react-redux/v/7.2.9">react-redux-v7-hooks</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>❌</td>
		<td>✅</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
	</tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux-connect</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>✅</td>
		<td>❌</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
	</tr>
	<tr>
		<th><a href="https://www.npmjs.com/package/react-redux/v/8.1.3">react-redux-v8-connect</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>✅</td>
		<td>❌</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
	</tr>
	<tr>
		<th><a href="https://www.npmjs.com/package/react-redux/v/7.2.9">react-redux-v7-connect</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>❌</td>
		<td>❌</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
	</tr>
	<tr>
		<th><a href="https://www.npmjs.com/package/react-redux/v/5.1.2">react-redux-v5-connect</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>❌</td>
		<td>❌</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
	</tr>
	<tr>
		<th><a href="https://npmjs.com/package/@preact/signals-react">@preact/signals-react</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
	</tr>

</table>

## Caveats

- Tearing and state branching may not be an issue depending on app requirements.
- The test is done in a very limited way.
  - Passing tests don't guarantee anything.
- The results may not be accurate.
  - Do not fully trust the results.

## If you are interested

The reason why I created this is to test my projects.

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [use-context-selector](https://github.com/dai-shi/use-context-selector)
- and so on

## Contributing

This repository is a tool for us to test some of global state libraries.
While it is totally fine to use the tool for other libraries under the license,
we don't generally accept adding a new library to the repository.

However, we are interested in various approaches.
If you have any suggestions feel free to open issues or pull requests.
We may consider adding (and removing) libraries.
Questions and discussions are also welcome in issues.

For listing global state libraries, we have another repository
https://github.com/dai-shi/lets-compare-global-state-with-react-hooks
in which we accept contributions. It's recommended to run this tool
and we put the result there, possibly a reference link to a PR
in this repository or a fork of this repository.
