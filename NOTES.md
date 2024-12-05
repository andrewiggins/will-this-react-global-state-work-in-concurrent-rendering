constate - delcare all selectors up front and create a provider per selector
react-tracked - proxy state wrapper that uses use-context-selector to provide granular updates
use-atom - combines use-context-selector with jotai atoms
use-context-selector - runs selector inside the reducer of useReducer to enable bailing out by returning the prev state if the selector is the same. Manually tracks a version number to help with concurrent rendering I assume
