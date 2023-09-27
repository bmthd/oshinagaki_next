import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<"input"> & {
  children?: ReactNode;
};

export const TextField = ({ children, className, ...props }: Props) => {
  return (
    <input className={`border border-gray-300 rounded-md p-2 ${className}`} {...props}>
      {children}
    </input>
  );
};
