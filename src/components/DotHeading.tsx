import { H } from "./structure/H";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const DotHeading = ({ children, className, id }: Props) => {
  const defaultClassName = `p-1 ${className}`;
  return (
    <H className={defaultClassName} id={id}>
      <span className="w-4 h-4 bg-accent inline-block rounded-full mr-2"></span>
      {children}
    </H>
  );
};
