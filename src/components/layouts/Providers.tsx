"use client";

import { useTwitterWidgets } from "@/hooks/twitterWidget";
import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";

const TwitterWidgetsProvider = () => {
  useTwitterWidgets();
  return null;
};

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <Suspense fallback={null}>
          <TwitterWidgetsProvider />
        </Suspense>
        {children}
      </SessionProvider>
    </>
  );
};
