"use client";
import { HeadingLevelContext, useLevel } from "@/hooks/context";
import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<"section"> & {
  children: ReactNode;
};

export const Section = ({ children, ...props }: Props) => {
  const level = useLevel();
  const nextLevel = Math.min(6, level + 1);
  return (
    <HeadingLevelContext.Provider value={{ level: nextLevel }}>
      <section {...props}>{children}</section>
    </HeadingLevelContext.Provider>
  );
};
