"use client";

import React, { useEffect, useMemo, useState } from "react";
import { store, persistor } from "@/stores/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavigationMenu from "@/shared/NavigationMenu";
import { ThemeSliceState } from "@/types";
import Footer from "@/components/ui/Footer";
import LoginModalProvider from "@/context/LoginModalContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <LoginModalProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </LoginModalProvider>
  );
};

export default Providers;
