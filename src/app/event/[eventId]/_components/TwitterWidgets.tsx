"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

declare global {
	interface Window {
		twttr: any;
	}
}

export const TwitterWidgets = () => {
	const searchParams = useSearchParams();
	useEffect(() => {
		if (typeof window !== "undefined" && window?.twttr?.widgets) {
			window.twttr.widgets.load();
		}
		return () => {
			if (typeof window !== "undefined" && window?.twttr?.widgets) {
				window.twttr.widgets.load();
			}
		};
	}, [searchParams]);
	return <Script src="https://platform.twitter.com/widgets.js" />;
};
