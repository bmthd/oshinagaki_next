import Link from "next/link";

type LinkProps = {
	href: string;
	children: React.ReactNode;
	className?: string;
};

type ButtonProps = {
	onClick: () => void;
	children: React.ReactNode;
	className?: string;
};

type Props = LinkProps | ButtonProps;

export const LinkButton = ({ children, className, ...props }: Props) => {
	const mergedClassName = `bg-primary hover:bg-primary-dark inline-flex items-center text-white font-bold font-md rounded-md p-4 m-2 ${className}`;

	const { href, onClick } = props as LinkProps & ButtonProps;

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
