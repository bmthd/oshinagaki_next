"use client";

import { Provider as JotaiProvider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const Provider = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<JotaiProvider>
				<SessionProvider>{children}</SessionProvider>
			</JotaiProvider>
		</>
	);
};
