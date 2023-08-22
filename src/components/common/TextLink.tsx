import Link from "next/link";
import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"a"> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const TextLink = ({ href, children, className, ...props }: Props) => {
  const blank = href?.startsWith("http");
  return (
    <Link
      href={href}
      className={`text-blue-500 hover:text-blue-600 underline ${className}`}
      target={blank ? "_blank" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};
