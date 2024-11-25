"use client";

import React from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthorContextProvider } from "@/lib/context/authors";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => console.error(error),
  }),
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthorContextProvider>
        {children}
      </AuthorContextProvider>
    </QueryClientProvider>
  );
}
