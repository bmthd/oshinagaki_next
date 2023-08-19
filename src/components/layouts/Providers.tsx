"use client";

import { useTwitterWidgets } from "@/hooks/twitterWidget";
import { Provider as JotaiProvider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  useTwitterWidgets();
  return (
    <>
      <JotaiProvider>
        <SessionProvider>{children}</SessionProvider>
      </JotaiProvider>
    </>
  );
};
