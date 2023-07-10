import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const H2 = ({children,className,id}: Props) => {
  const defaultClassName = `text-2xl font-bold bg-secondary p-2 text-white text-center rounded-md ${className}`
  return (
    <h2 className={defaultClassName} id={id}>
      {children}
    </h2>
  );
};
