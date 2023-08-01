import Link from "next/link";

type Props = {
	href: string;
	children: React.ReactNode;
	className?: string;
};

export const TextLink = ({ href, children, className }: Props) => {
	const blank = href?.startsWith("http");
	return (
		<Link
			href={href}
			className={`text-blue-500 hover:text-blue-600 underline ${className}`}
			target={blank ? "_blank" : undefined}>
			{children}
		</Link>
	);
};
