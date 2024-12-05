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
       ✓ No tearing finally on update (4824 ms)
       ✓ No tearing finally on mount (7636 ms)
     Level 2
       ✓ No tearing temporarily on update (8804 ms)
       ✓ No tearing temporarily on mount (7586 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3796 ms)
       ✓ Can branch state (wip state) (5284 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9801 ms)
       ✓ No tearing finally on mount (6742 ms)
     Level 2
       ✓ No tearing temporarily on update (14751 ms)
       ✓ No tearing temporarily on mount (6644 ms)
 react-redux
   With useTransition
     Level 1
       ✓ No tearing finally on update (8159 ms)
       ✓ No tearing finally on mount (4706 ms)
     Level 2
       ✓ No tearing temporarily on update (13162 ms)
       ✓ No tearing temporarily on mount (4682 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8102 ms)
       ✕ Can branch state (wip state) (6798 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9831 ms)
       ✓ No tearing finally on mount (4705 ms)
     Level 2
       ✓ No tearing temporarily on update (14833 ms)
       ✓ No tearing temporarily on mount (4655 ms)
 react-redux-v5
   With useTransition
     Level 1
       ✓ No tearing finally on update (8192 ms)
       ✓ No tearing finally on mount (6650 ms)
     Level 2
       ✕ No tearing temporarily on update (13211 ms)
       ✕ No tearing temporarily on mount (6611 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8200 ms)
       ✕ Can branch state (wip state) (6789 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9876 ms)
       ✓ No tearing finally on mount (6668 ms)
     Level 2
       ✓ No tearing temporarily on update (14849 ms)
       ✕ No tearing temporarily on mount (6648 ms)
 react-redux-v6
   With useTransition
     Level 1
       ✓ No tearing finally on update (4721 ms)
       ✓ No tearing finally on mount (5629 ms)
     Level 2
       ✓ No tearing temporarily on update (8835 ms)
       ✓ No tearing temporarily on mount (6600 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3792 ms)
       ✕ Can branch state (wip state) (9388 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9804 ms)
       ✓ No tearing finally on mount (5718 ms)
     Level 2
       ✓ No tearing temporarily on update (14939 ms)
       ✓ No tearing temporarily on mount (5672 ms)
 react-redux-v7
   With useTransition
     Level 1
       ✓ No tearing finally on update (8216 ms)
       ✓ No tearing finally on mount (5685 ms)
     Level 2
       ✕ No tearing temporarily on update (13128 ms)
       ✕ No tearing temporarily on mount (6665 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8243 ms)
       ✕ Can branch state (wip state) (6864 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10535 ms)
       ✓ No tearing finally on mount (6658 ms)
     Level 2
       ✓ No tearing temporarily on update (14668 ms)
       ✕ No tearing temporarily on mount (6645 ms)
 react-redux-v8
   With useTransition
     Level 1
       ✓ No tearing finally on update (8198 ms)
       ✓ No tearing finally on mount (4693 ms)
     Level 2
       ✕ No tearing temporarily on update (13185 ms)
       ✓ No tearing temporarily on mount (4664 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8197 ms)
       ✕ Can branch state (wip state) (6831 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11494 ms)
       ✓ No tearing finally on mount (4693 ms)
     Level 2
       ✓ No tearing temporarily on update (16523 ms)
       ✓ No tearing temporarily on mount (4699 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5733 ms)
       ✓ No tearing finally on mount (9631 ms)
     Level 2
       ✓ No tearing temporarily on update (8781 ms)
       ✓ No tearing temporarily on mount (9612 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3749 ms)
       ✓ Can branch state (wip state) (8338 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15650 ms)
       ✓ No tearing finally on mount (6646 ms)
     Level 2
       ✓ No tearing temporarily on update (19692 ms)
       ✓ No tearing temporarily on mount (6577 ms)

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
		<th><a href="https://react-redux.js.org">react-redux</a></th>
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
		<th><a href="https://www.npmjs.com/package/react-redux/v/5.1.2">react-redux-v5</a></th>
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
		<th><a href="https://www.npmjs.com/package/react-redux/v/6.0.1">react-redux-v6</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
	</tr>
	<tr>
		<th><a href="https://www.npmjs.com/package/react-redux/v/7.2.9">react-redux-v7</a></th>
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
		<th><a href="https://www.npmjs.com/package/react-redux/v/8.1.3">react-redux-v8</a></th>
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
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
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
