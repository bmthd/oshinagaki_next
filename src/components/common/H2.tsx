import { ReactNode } from "react";

export const H2 = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-2xl font-bold bg-secondary p-2 my-2 text-white text-center rounded-md">
      {children}
    </h2>
  );
};
