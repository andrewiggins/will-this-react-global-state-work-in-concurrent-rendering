import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  renderApp,
} from '../common';

const queryKey = ['counter'];

const client = new QueryClient();

const useCount = () => {
  const { data } = useQuery({
    queryKey,
    queryFn: () => {
      throw new Error('should never be called');
    },
    staleTime: Infinity,
    initialData: initialState,
  });
  return selectCount(data);
};

const useIncrement = () => {
  const queryClient = useQueryClient();
  const increment = () =>
    queryClient.setQueryData(queryKey, (prev) =>
      reducer(prev, incrementAction),
    );
  return increment;
};

const useDouble = () => {
  const queryClient = useQueryClient();
  const doDouble = () =>
    queryClient.setQueryData(queryKey, (prev) => reducer(prev, doubleAction));
  return doDouble;
};

const Root = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

renderApp(useCount, useIncrement, useDouble, Root);
