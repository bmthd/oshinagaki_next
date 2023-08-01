"use client";

import { HeadingLevelContext, useLevel } from "@/app/hooks/context";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface Props extends ComponentPropsWithoutRef<"section"> {
  children: ReactNode;
}

export const Section = ({ children, ...props }: Props) => {
  const level = useLevel();
  const nextLevel = Math.min(6, level + 1);
  return (
    <HeadingLevelContext.Provider value={{ level: nextLevel }}>
      <section {...props}>{children}</section>
    </HeadingLevelContext.Provider>
  );
};
