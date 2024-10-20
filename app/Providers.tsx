"use client";

import React from "react";
import { store, persistor } from "@/stores/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavigationMenu from "@/shared/NavigationMenu";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationMenu />
          <main className="pt-20 min-h-nav-full">{children}</main>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
