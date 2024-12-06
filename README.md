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
       ✓ No tearing finally on update (4869 ms)
       ✓ No tearing finally on mount (7628 ms)
     Level 2
       ✓ No tearing temporarily on update (8792 ms)
       ✓ No tearing temporarily on mount (7607 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3765 ms)
       ✓ Can branch state (wip state) (5325 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9804 ms)
       ✓ No tearing finally on mount (6706 ms)
     Level 2
       ✓ No tearing temporarily on update (14796 ms)
       ✓ No tearing temporarily on mount (5649 ms)
 react-redux
   With useTransition
     Level 1
       ✓ No tearing finally on update (8141 ms)
       ✓ No tearing finally on mount (4674 ms)
     Level 2
       ✓ No tearing temporarily on update (13138 ms)
       ✓ No tearing temporarily on mount (4671 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8119 ms)
       ✕ Can branch state (wip state) (6799 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9828 ms)
       ✓ No tearing finally on mount (4692 ms)
     Level 2
       ✓ No tearing temporarily on update (14802 ms)
       ✓ No tearing temporarily on mount (4673 ms)
 react-redux-connected
   With useTransition
     Level 1
       ✓ No tearing finally on update (8261 ms)
       ✓ No tearing finally on mount (4683 ms)
     Level 2
       ✕ No tearing temporarily on update (13348 ms)
       ✓ No tearing temporarily on mount (4649 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8268 ms)
       ✕ Can branch state (wip state) (6844 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11622 ms)
       ✓ No tearing finally on mount (4666 ms)
     Level 2
       ✓ No tearing temporarily on update (16572 ms)
       ✓ No tearing temporarily on mount (4641 ms)
 react-redux-v5
   With useTransition
     Level 1
       ✓ No tearing finally on update (8229 ms)
       ✓ No tearing finally on mount (6668 ms)
     Level 2
       ✕ No tearing temporarily on update (13239 ms)
       ✕ No tearing temporarily on mount (5625 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8290 ms)
       ✕ Can branch state (wip state) (6878 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9918 ms)
       ✓ No tearing finally on mount (6652 ms)
     Level 2
       ✓ No tearing temporarily on update (14884 ms)
       ✕ No tearing temporarily on mount (6627 ms)
 react-redux-v6
   With useTransition
     Level 1
       ✓ No tearing finally on update (4731 ms)
       ✓ No tearing finally on mount (5667 ms)
     Level 2
       ✓ No tearing temporarily on update (8805 ms)
       ✓ No tearing temporarily on mount (5605 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3775 ms)
       ✕ Can branch state (wip state) (9227 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9926 ms)
       ✓ No tearing finally on mount (5677 ms)
     Level 2
       ✓ No tearing temporarily on update (14909 ms)
       ✓ No tearing temporarily on mount (5639 ms)
 react-redux-v7
   With useTransition
     Level 1
       ✓ No tearing finally on update (8148 ms)
       ✓ No tearing finally on mount (5630 ms)
     Level 2
       ✕ No tearing temporarily on update (13124 ms)
       ✕ No tearing temporarily on mount (6652 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8128 ms)
       ✕ Can branch state (wip state) (6841 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10587 ms)
       ✓ No tearing finally on mount (5644 ms)
     Level 2
       ✓ No tearing temporarily on update (14695 ms)
       ✕ No tearing temporarily on mount (6654 ms)
 react-redux-v8
   With useTransition
     Level 1
       ✓ No tearing finally on update (8231 ms)
       ✓ No tearing finally on mount (4697 ms)
     Level 2
       ✕ No tearing temporarily on update (13271 ms)
       ✓ No tearing temporarily on mount (4655 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8258 ms)
       ✕ Can branch state (wip state) (6821 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11595 ms)
       ✓ No tearing finally on mount (4680 ms)
     Level 2
       ✓ No tearing temporarily on update (16609 ms)
       ✓ No tearing temporarily on mount (4655 ms)
 preact-signals
   With useTransition
     Level 1
       ✓ No tearing finally on update (8151 ms)
       ✓ No tearing finally on mount (4696 ms)
     Level 2
       ✓ No tearing temporarily on update (13145 ms)
       ✓ No tearing temporarily on mount (4674 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8132 ms)
       ✕ Can branch state (wip state) (6804 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9822 ms)
       ✓ No tearing finally on mount (4696 ms)
     Level 2
       ✓ No tearing temporarily on update (14810 ms)
       ✓ No tearing temporarily on mount (4684 ms)

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
		<th><a href="https://react-redux.js.org">react-redux-connected</a></th>
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
