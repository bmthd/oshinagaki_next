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
  const mergedClassName = `bg-primary hover:bg-primary-dark inline-flex items-center justify-center text-white text-xl font-bold rounded-md p-4 ${className}`;

  if (!href) {
    return (
      <button type="button" className={mergedClassName} onClick={onClick}>
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
