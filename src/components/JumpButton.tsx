import Link from "next/link";

type Props = {
  href?: string;
  onClick?: () => void;
  blank?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const LinkButton = ({ href, onClick, children, className }: Props) => {
  const baseCSS = `bg-primary hover:bg-primary-dark inline-flex items-center text-white font-bold rounded-md p-4 ${className}`;

  if (!href)
    return (
      <button className={baseCSS} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <Link href={href} className={baseCSS}>
      {children}
    </Link>
  );
};
