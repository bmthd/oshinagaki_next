"use client";

import { useSearchParams } from "next/navigation";
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
  }, [searchParams]);

  return null;
};
