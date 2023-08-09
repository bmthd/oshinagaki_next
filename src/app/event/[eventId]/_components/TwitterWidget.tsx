"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

export const TwitterWidgets = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    script.setAttribute("async", "true");
    document.head.appendChild(script);
    window.twttr?.widgets.load();
    return () => {
      const script = document.createElement("script");
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("async", "true");
      document.head.appendChild(script);
      window.twttr?.widgets.load();
      document.head.removeChild(script);
    };
  }, []);

  return <Script src="https://platform.twitter.com/widgets.js" />;
};
