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
       ✓ No tearing finally on update (4845 ms)
       ✓ No tearing finally on mount (7631 ms)
     Level 2
       ✓ No tearing temporarily on update (8768 ms)
       ✓ No tearing temporarily on mount (7602 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3794 ms)
       ✓ Can branch state (wip state) (5324 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9829 ms)
       ✓ No tearing finally on mount (6735 ms)
     Level 2
       ✓ No tearing temporarily on update (14824 ms)
       ✓ No tearing temporarily on mount (6649 ms)
 react-redux
   With useTransition
     Level 1
       ✓ No tearing finally on update (8189 ms)
       ✓ No tearing finally on mount (4720 ms)
     Level 2
       ✓ No tearing temporarily on update (13138 ms)
       ✓ No tearing temporarily on mount (4661 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8141 ms)
       ✕ Can branch state (wip state) (6829 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9831 ms)
       ✓ No tearing finally on mount (4758 ms)
     Level 2
       ✓ No tearing temporarily on update (14890 ms)
       ✓ No tearing temporarily on mount (4681 ms)
 tanstack-query
   With useTransition
     Level 1
       ✓ No tearing finally on update (8235 ms)
       ✓ No tearing finally on mount (4717 ms)
     Level 2
       ✕ No tearing temporarily on update (13251 ms)
       ✓ No tearing temporarily on mount (4690 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8201 ms)
       ✕ Can branch state (wip state) (6841 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9700 ms)
       ✓ No tearing finally on mount (4728 ms)
     Level 2
       ✓ No tearing temporarily on update (13777 ms)
       ✓ No tearing temporarily on mount (4674 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8130 ms)
       ✓ No tearing finally on mount (4678 ms)
     Level 2
       ✓ No tearing temporarily on update (13182 ms)
       ✓ No tearing temporarily on mount (4672 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8138 ms)
       ✕ Can branch state (wip state) (6843 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9812 ms)
       ✓ No tearing finally on mount (4703 ms)
     Level 2
       ✓ No tearing temporarily on update (14798 ms)
       ✓ No tearing temporarily on mount (4666 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5703 ms)
       ✓ No tearing finally on mount (9606 ms)
     Level 2
       ✓ No tearing temporarily on update (8813 ms)
       ✓ No tearing temporarily on mount (9641 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3779 ms)
       ✓ Can branch state (wip state) (8353 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15634 ms)
       ✓ No tearing finally on mount (6670 ms)
     Level 2
       ✓ No tearing temporarily on update (19663 ms)
       ✓ No tearing temporarily on mount (6902 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4710 ms)
       ✓ No tearing finally on mount (6604 ms)
     Level 2
       ✓ No tearing temporarily on update (8783 ms)
       ✓ No tearing temporarily on mount (6594 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3796 ms)
       ✓ Can branch state (wip state) (5333 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9822 ms)
       ✓ No tearing finally on mount (6610 ms)
     Level 2
       ✓ No tearing temporarily on update (14817 ms)
       ✓ No tearing temporarily on mount (5702 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (8164 ms)
       ✓ No tearing finally on mount (4759 ms)
     Level 2
       ✓ No tearing temporarily on update (13214 ms)
       ✓ No tearing temporarily on mount (4648 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8160 ms)
       ✕ Can branch state (wip state) (6828 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9877 ms)
       ✓ No tearing finally on mount (4690 ms)
     Level 2
       ✓ No tearing temporarily on update (14834 ms)
       ✓ No tearing temporarily on mount (4653 ms)
 use-context-selector-base
   With useTransition
     Level 1
       ✓ No tearing finally on update (8149 ms)
       ✓ No tearing finally on mount (7609 ms)
     Level 2
       ✓ No tearing temporarily on update (13160 ms)
       ✓ No tearing temporarily on mount (7582 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8161 ms)
       ✕ Can branch state (wip state) (7873 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9893 ms)
       ✓ No tearing finally on mount (5750 ms)
     Level 2
       ✓ No tearing temporarily on update (14844 ms)
       ✓ No tearing temporarily on mount (5669 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5735 ms)
       ✓ No tearing finally on mount (9621 ms)
     Level 2
       ✓ No tearing temporarily on update (8821 ms)
       ✓ No tearing temporarily on mount (7582 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3789 ms)
       ✓ Can branch state (wip state) (8355 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15675 ms)
       ✓ No tearing finally on mount (6640 ms)
     Level 2
       ✓ No tearing temporarily on update (19694 ms)
       ✓ No tearing temporarily on mount (8668 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (8161 ms)
       ✓ No tearing finally on mount (4683 ms)
     Level 2
       ✓ No tearing temporarily on update (13223 ms)
       ✓ No tearing temporarily on mount (4657 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8166 ms)
       ✕ Can branch state (wip state) (6867 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9880 ms)
       ✓ No tearing finally on mount (4740 ms)
     Level 2
       ✓ No tearing temporarily on update (14889 ms)
       ✓ No tearing temporarily on mount (4685 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8598 ms)
       ✓ No tearing finally on mount (4711 ms)
     Level 2
       ✕ No tearing temporarily on update (13606 ms)
       ✓ No tearing temporarily on mount (4704 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8628 ms)
       ✕ Can branch state (wip state) (7168 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10841 ms)
       ✓ No tearing finally on mount (4704 ms)
     Level 2
       ✓ No tearing temporarily on update (14871 ms)
       ✓ No tearing temporarily on mount (4686 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8163 ms)
       ✓ No tearing finally on mount (4690 ms)
     Level 2
       ✓ No tearing temporarily on update (13195 ms)
       ✓ No tearing temporarily on mount (4660 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8166 ms)
       ✕ Can branch state (wip state) (6833 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9854 ms)
       ✓ No tearing finally on mount (4715 ms)
     Level 2
       ✓ No tearing temporarily on update (14866 ms)
       ✓ No tearing temporarily on mount (4678 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5791 ms)
       ✓ No tearing finally on mount (4727 ms)
     Level 2
       ✓ No tearing temporarily on update (8843 ms)
       ✕ No tearing temporarily on mount (4708 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3759 ms)
       ✕ Can branch state (wip state) (10256 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11540 ms)
       ✓ No tearing finally on mount (5676 ms)
     Level 2
       ✓ No tearing temporarily on update (15550 ms)
       ✕ No tearing temporarily on mount (5685 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (5751 ms)
       ✓ No tearing finally on mount (5636 ms)
     Level 2
       ✓ No tearing temporarily on update (9854 ms)
       ✕ No tearing temporarily on mount (5636 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4857 ms)
       ✕ Can branch state (wip state) (10360 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10859 ms)
       ✓ No tearing finally on mount (5671 ms)
     Level 2
       ✓ No tearing temporarily on update (15830 ms)
       ✕ No tearing temporarily on mount (5693 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6737 ms)
       ✓ No tearing finally on mount (11663 ms)
     Level 2
       ✓ No tearing temporarily on update (9816 ms)
       ✓ No tearing temporarily on mount (11880 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4762 ms)
       ✓ Can branch state (wip state) (9632 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16672 ms)
       ✓ No tearing finally on mount (6672 ms)
     Level 2
       ✓ No tearing temporarily on update (20729 ms)
       ✓ No tearing temporarily on mount (6595 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8178 ms)
       ✓ No tearing finally on mount (4729 ms)
     Level 2
       ✓ No tearing temporarily on update (13225 ms)
       ✓ No tearing temporarily on mount (4664 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8130 ms)
       ✕ Can branch state (wip state) (6852 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9845 ms)
       ✓ No tearing finally on mount (4761 ms)
     Level 2
       ✓ No tearing temporarily on update (14865 ms)
       ✓ No tearing temporarily on mount (4685 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (8153 ms)
       ✓ No tearing finally on mount (4742 ms)
     Level 2
       ✓ No tearing temporarily on update (13187 ms)
       ✓ No tearing temporarily on mount (4675 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8157 ms)
       ✕ Can branch state (wip state) (6842 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9801 ms)
       ✓ No tearing finally on mount (4683 ms)
     Level 2
       ✓ No tearing temporarily on update (14842 ms)
       ✓ No tearing temporarily on mount (4713 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8198 ms)
       ✓ No tearing finally on mount (4663 ms)
     Level 2
       ✓ No tearing temporarily on update (13218 ms)
       ✓ No tearing temporarily on mount (4675 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8175 ms)
       ✕ Can branch state (wip state) (6838 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9834 ms)
       ✓ No tearing finally on mount (4690 ms)
     Level 2
       ✓ No tearing temporarily on update (14874 ms)
       ✓ No tearing temporarily on mount (4696 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4766 ms)
       ✓ No tearing finally on mount (6648 ms)
     Level 2
       ✓ No tearing temporarily on update (8802 ms)
       ✓ No tearing temporarily on mount (6630 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3753 ms)
       ✕ Can branch state (wip state) (9284 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9815 ms)
       ✓ No tearing finally on mount (6627 ms)
     Level 2
       ✓ No tearing temporarily on update (14779 ms)
       ✓ No tearing temporarily on mount (6641 ms)
 react-query
   With useTransition
     Level 1
       ✓ No tearing finally on update (8261 ms)
       ✓ No tearing finally on mount (4749 ms)
     Level 2
       ✕ No tearing temporarily on update (13247 ms)
       ✓ No tearing temporarily on mount (4678 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8197 ms)
       ✕ Can branch state (wip state) (6850 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9723 ms)
       ✓ No tearing finally on mount (4674 ms)
     Level 2
       ✓ No tearing temporarily on update (13811 ms)
       ✓ No tearing temporarily on mount (4661 ms)
 mobx-react-lite
   With useTransition
     Level 1
       ✓ No tearing finally on update (8278 ms)
       ✓ No tearing finally on mount (4716 ms)
     Level 2
       ✓ No tearing temporarily on update (13599 ms)
       ✓ No tearing temporarily on mount (4689 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8175 ms)
       ✕ Can branch state (wip state) (6833 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9867 ms)
       ✓ No tearing finally on mount (4719 ms)
     Level 2
       ✓ No tearing temporarily on update (14884 ms)
       ✓ No tearing temporarily on mount (4667 ms)

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
		<th><a href="https://tanstack.com/query/latest">tanstack-query</a></th>
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
		<th><a href="https://github.com/pmndrs/zustand">zustand</a></th>
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
		<th><a href="https://react-tracked.js.org">react-tracked</a></th>
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
		<th><a href="https://github.com/diegohaz/constate">constate</a></th>
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
		<th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
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
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer, w/o useContextUpdate)</th>
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
	<tr>
		<th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
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
		<th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
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
		<th><a href="https://recoiljs.org">recoil</a></th>
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
		<th><a href="https://recoiljs.org">recoil (UNSTABLE)</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>✅</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai</a></th>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
		<td>✅</td>
		<td>❌</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>❌</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-atom">use-atom</a></th>
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
		<th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
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
		<th><a href="https://github.com/zerobias/effector">effector</a></th>
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
		<th><a href="https://react-rxjs.org">react-rxjs</a></th>
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
		<th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
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
		<th><a href="https://react-query.tanstack.com/">react-query</a></th>
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
		<th><a href="https://github.com/mobxjs/mobx-react-lite">mobx-react-lite</a></th>
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
