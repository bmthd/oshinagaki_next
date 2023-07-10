import Link from "next/link";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export const LinkButton = ({ href, onClick, children, className }: Props) => {
  const classNameDefault = `bg-primary hover:bg-primary-dark inline-flex items-center text-white font-bold font-md rounded-md p-4 m-2 ${className}`;
  const blank = href?.startsWith("http");

  if (!href)
    return (
      <button
        className={classNameDefault}
        onClick={onClick}
      >
        {children}
      </button>
    );

  return (
    <Link
      href={href}
      className={classNameDefault}
      target={blank ? "_blank" : undefined}
    >
      {children}
    </Link>
  );
};
