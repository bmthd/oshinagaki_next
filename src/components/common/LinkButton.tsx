import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const LinkButton = ({ href, children, className }: Props) => {
  return (
    <Link
      href={href}
      className={`bg-primary hover:bg-primary-dark inline-flex items-center text-white font-bold font-md rounded-md p-4 ${className}`}
    >
      {children}
    </Link>
  );
};

