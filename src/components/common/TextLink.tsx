import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" ;
};

export const TextLink = ({ href, children, className,target }: Props) => {
  return (
    <Link
      href={href}
      className={`text-blue-500 hover:text-blue-600 underline ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
