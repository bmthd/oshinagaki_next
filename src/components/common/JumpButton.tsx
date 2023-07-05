import Link from "next/link";

type Props = {
  href?: string;
  onClick?: () => void;
  blank?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const LinkButton = ({ href,onClick, children, className }: Props) => {
  if(!href) return (
    <button
      className={`bg-primary hover:bg-primary-dark inline-flex items-center text-white font-bold font-md rounded-md p-4 ${className}`}
    onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <Link
      href={href}
      className={`bg-primary hover:bg-primary-dark inline-flex items-center text-white font-bold font-md rounded-md p-4 ${className}`}
    >
      {children}
    </Link>
  );
};

