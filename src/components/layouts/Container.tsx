import { Section } from "@/components/structure/Section";
import { ReactNode } from "react";

/**
 * 画面幅に応じてメインコンテンツの横幅を調整し、中央寄せにするコンポーネント
 * @returns section
 */
export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <Section className="container flex flex-col justify-center items-center mx-auto lg:my-4 p-4">
      {children}
    </Section>
  );
};
