import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

type LinkProps = Props & {
  href: string;
  onClick?: never;
};

type ButtonProps = Props & {
  onClick: () => void;
  href?: never;
};

export const LinkButton = ({ children, className, href, onClick }: LinkProps | ButtonProps) => {
  const mergedClassName = `bg-primary hover:bg-primary-dark inline-flex items-center text-white font-bold font-md rounded-md p-4 m-2 ${className}`;

  if (!href) {
    return (
      <button className={mergedClassName} onClick={onClick}>
        {children}
      </button>
    );
  } else {
    const blank = href?.startsWith("http");
    return (
      <Link href={href} className={mergedClassName} target={blank ? "_blank" : undefined}>
        {children}
      </Link>
    );
  }
};
