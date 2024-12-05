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
       ✓ No tearing finally on update (8253 ms)
       ✓ No tearing finally on mount (4695 ms)
     Level 2
       ✓ No tearing temporarily on update (13134 ms)
       ✓ No tearing temporarily on mount (4681 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8151 ms)
       ✕ Can branch state (wip state) (6802 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9929 ms)
       ✓ No tearing finally on mount (4675 ms)
     Level 2
       ✓ No tearing temporarily on update (14946 ms)
       ✓ No tearing temporarily on mount (4715 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8138 ms)
       ✓ No tearing finally on mount (4694 ms)
     Level 2
       ✓ No tearing temporarily on update (13157 ms)
       ✓ No tearing temporarily on mount (4707 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8119 ms)
       ✕ Can branch state (wip state) (6834 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9775 ms)
       ✓ No tearing finally on mount (4675 ms)
     Level 2
       ✓ No tearing temporarily on update (14779 ms)
       ✓ No tearing temporarily on mount (4679 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5725 ms)
       ✓ No tearing finally on mount (7620 ms)
     Level 2
       ✓ No tearing temporarily on update (8800 ms)
       ✓ No tearing temporarily on mount (9622 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3746 ms)
       ✓ Can branch state (wip state) (8447 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15644 ms)
       ✓ No tearing finally on mount (8719 ms)
     Level 2
       ✓ No tearing temporarily on update (19695 ms)
       ✓ No tearing temporarily on mount (6619 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4753 ms)
       ✓ No tearing finally on mount (6624 ms)
     Level 2
       ✓ No tearing temporarily on update (8800 ms)
       ✓ No tearing temporarily on mount (6610 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3810 ms)
       ✓ Can branch state (wip state) (5353 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9791 ms)
       ✓ No tearing finally on mount (6707 ms)
     Level 2
       ✓ No tearing temporarily on update (14787 ms)
       ✓ No tearing temporarily on mount (6612 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (8166 ms)
       ✓ No tearing finally on mount (4685 ms)
     Level 2
       ✓ No tearing temporarily on update (13157 ms)
       ✓ No tearing temporarily on mount (4703 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8155 ms)
       ✕ Can branch state (wip state) (6812 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9860 ms)
       ✓ No tearing finally on mount (4690 ms)
     Level 2
       ✓ No tearing temporarily on update (14846 ms)
       ✓ No tearing temporarily on mount (4717 ms)
 use-context-selector-base
   With useTransition
     Level 1
       ✓ No tearing finally on update (8797 ms)
       ✓ No tearing finally on mount (7638 ms)
     Level 2
       ✓ No tearing temporarily on update (13224 ms)
       ✓ No tearing temporarily on mount (7589 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8420 ms)
       ✕ Can branch state (wip state) (7970 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9841 ms)
       ✓ No tearing finally on mount (5925 ms)
     Level 2
       ✓ No tearing temporarily on update (14859 ms)
       ✓ No tearing temporarily on mount (5644 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5700 ms)
       ✓ No tearing finally on mount (9650 ms)
     Level 2
       ✓ No tearing temporarily on update (8778 ms)
       ✓ No tearing temporarily on mount (11649 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3802 ms)
       ✓ Can branch state (wip state) (8377 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15695 ms)
       ✓ No tearing finally on mount (6683 ms)
     Level 2
       ✓ No tearing temporarily on update (19750 ms)
       ✓ No tearing temporarily on mount (8599 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (8167 ms)
       ✓ No tearing finally on mount (4684 ms)
     Level 2
       ✓ No tearing temporarily on update (13154 ms)
       ✓ No tearing temporarily on mount (4673 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8160 ms)
       ✕ Can branch state (wip state) (6814 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9835 ms)
       ✓ No tearing finally on mount (4693 ms)
     Level 2
       ✓ No tearing temporarily on update (14889 ms)
       ✓ No tearing temporarily on mount (4679 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8526 ms)
       ✓ No tearing finally on mount (4705 ms)
     Level 2
       ✕ No tearing temporarily on update (13483 ms)
       ✓ No tearing temporarily on mount (4676 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8485 ms)
       ✕ Can branch state (wip state) (7088 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10685 ms)
       ✓ No tearing finally on mount (4711 ms)
     Level 2
       ✓ No tearing temporarily on update (14766 ms)
       ✓ No tearing temporarily on mount (4648 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8205 ms)
       ✓ No tearing finally on mount (4714 ms)
     Level 2
       ✓ No tearing temporarily on update (13190 ms)
       ✓ No tearing temporarily on mount (4644 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8150 ms)
       ✕ Can branch state (wip state) (6800 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9888 ms)
       ✓ No tearing finally on mount (4682 ms)
     Level 2
       ✓ No tearing temporarily on update (14821 ms)
       ✓ No tearing temporarily on mount (4656 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5771 ms)
       ✓ No tearing finally on mount (4701 ms)
     Level 2
       ✓ No tearing temporarily on update (8856 ms)
       ✕ No tearing temporarily on mount (4702 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3787 ms)
       ✕ Can branch state (wip state) (10329 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11495 ms)
       ✓ No tearing finally on mount (5708 ms)
     Level 2
       ✓ No tearing temporarily on update (15583 ms)
       ✕ No tearing temporarily on mount (4666 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (5751 ms)
       ✓ No tearing finally on mount (5657 ms)
     Level 2
       ✓ No tearing temporarily on update (9830 ms)
       ✕ No tearing temporarily on mount (5617 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4798 ms)
       ✕ Can branch state (wip state) (10311 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10902 ms)
       ✓ No tearing finally on mount (5669 ms)
     Level 2
       ✓ No tearing temporarily on update (15877 ms)
       ✕ No tearing temporarily on mount (5665 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6764 ms)
       ✓ No tearing finally on mount (9660 ms)
     Level 2
       ✓ No tearing temporarily on update (9790 ms)
       ✓ No tearing temporarily on mount (11649 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4762 ms)
       ✓ Can branch state (wip state) (9403 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16672 ms)
       ✓ No tearing finally on mount (6701 ms)
     Level 2
       ✓ No tearing temporarily on update (20708 ms)
       ✓ No tearing temporarily on mount (6594 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8224 ms)
       ✓ No tearing finally on mount (4750 ms)
     Level 2
       ✓ No tearing temporarily on update (13219 ms)
       ✓ No tearing temporarily on mount (4704 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8189 ms)
       ✕ Can branch state (wip state) (6845 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9868 ms)
       ✓ No tearing finally on mount (4674 ms)
     Level 2
       ✓ No tearing temporarily on update (14831 ms)
       ✓ No tearing temporarily on mount (4657 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (8151 ms)
       ✓ No tearing finally on mount (4701 ms)
     Level 2
       ✓ No tearing temporarily on update (13147 ms)
       ✓ No tearing temporarily on mount (4662 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8158 ms)
       ✕ Can branch state (wip state) (6822 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9859 ms)
       ✓ No tearing finally on mount (4693 ms)
     Level 2
       ✓ No tearing temporarily on update (14788 ms)
       ✓ No tearing temporarily on mount (4736 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8210 ms)
       ✓ No tearing finally on mount (4704 ms)
     Level 2
       ✓ No tearing temporarily on update (13185 ms)
       ✓ No tearing temporarily on mount (4689 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8162 ms)
       ✕ Can branch state (wip state) (6846 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9827 ms)
       ✓ No tearing finally on mount (4705 ms)
     Level 2
       ✓ No tearing temporarily on update (14861 ms)
       ✓ No tearing temporarily on mount (4685 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4684 ms)
       ✓ No tearing finally on mount (5661 ms)
     Level 2
       ✓ No tearing temporarily on update (8803 ms)
       ✓ No tearing temporarily on mount (6641 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3775 ms)
       ✕ Can branch state (wip state) (9322 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9824 ms)
       ✓ No tearing finally on mount (5760 ms)
     Level 2
       ✓ No tearing temporarily on update (14863 ms)
       ✓ No tearing temporarily on mount (5659 ms)
 react-query
   With useTransition
     Level 1
       ✓ No tearing finally on update (8214 ms)
       ✓ No tearing finally on mount (4688 ms)
     Level 2
       ✕ No tearing temporarily on update (13209 ms)
       ✓ No tearing temporarily on mount (4686 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8221 ms)
       ✕ Can branch state (wip state) (6907 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9676 ms)
       ✓ No tearing finally on mount (4728 ms)
     Level 2
       ✓ No tearing temporarily on update (13818 ms)
       ✓ No tearing temporarily on mount (4736 ms)
 mobx-react-lite
   With useTransition
     Level 1
       ✓ No tearing finally on update (8225 ms)
       ✓ No tearing finally on mount (4746 ms)
     Level 2
       ✓ No tearing temporarily on update (13174 ms)
       ✓ No tearing temporarily on mount (4676 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8149 ms)
       ✕ Can branch state (wip state) (6815 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9839 ms)
       ✓ No tearing finally on mount (4722 ms)
     Level 2
       ✓ No tearing temporarily on update (14863 ms)
       ✓ No tearing temporarily on mount (4692 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/zustand">zustand</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-tracked.js.org">react-tracked</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/diegohaz/constate">constate</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer, w/o useContextUpdate)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil (UNSTABLE)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-atom">use-atom</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/zerobias/effector">effector</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-rxjs.org">react-rxjs</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-query.tanstack.com/">react-query</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/mobxjs/mobx-react-lite">mobx-react-lite</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
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
