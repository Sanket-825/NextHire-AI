import { QueryClient } from "@tanstack/react-query";

// Single shared QueryClient for the app. Defaults kept conservative —
// individual queries can override staleTime/retry as needed.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
