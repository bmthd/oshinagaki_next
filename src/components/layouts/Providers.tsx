"use client";

import { useTwitterWidgets } from "@/hooks/twitterWidget";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  useTwitterWidgets();
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};
