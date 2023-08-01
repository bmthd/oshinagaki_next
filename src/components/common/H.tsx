"use client";

import { useLevel } from "@/app/hooks/context";
import { HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLHeadingElement> {
	children: ReactNode;
}

export const H = ({ children, ...props }: Props) => {
	const level = useLevel();
	switch (level) {
		case 1:
			return <h1 {...props}>{children}</h1>;
		case 2:
			return <h2 {...props}>{children}</h2>;
		case 3:
			return <h3 {...props}>{children}</h3>;
		case 4:
			return <h4 {...props}>{children}</h4>;
		case 5:
			return <h5 {...props}>{children}</h5>;
		case 6:
			return <h6 {...props}>{children}</h6>;
		default:
			return <h1 {...props}>{children}</h1>;
	}
};
