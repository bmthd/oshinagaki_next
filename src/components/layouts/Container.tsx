import { Section } from "@/components/Section";
import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return <Section className="container mx-auto lg:my-4">{children}</Section>;
};
