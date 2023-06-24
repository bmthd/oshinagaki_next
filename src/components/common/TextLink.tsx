import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const TextLink = ({ href, children, className }: Props) => {
  return (
    <Link
      href={href}
      className={`text-blue-500 hover:text-blue-600 underline ${className}`}
    >
      {children}
    </Link>
  );
};
