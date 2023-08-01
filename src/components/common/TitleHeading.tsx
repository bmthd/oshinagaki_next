import { ReactNode } from "react";
import { H } from "./H";
interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const TitleHeading = ({ children, className, id }: Props) => {
  const defaultClassName = `text-2xl font-bold bg-secondary p-2 text-white text-center rounded-md ${className}`;
  return (
    <H className={defaultClassName} id={id}>
      {children}
    </H>
  );
};
