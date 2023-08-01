"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr: any;
  }
}

export const TwitterWidgets = () => {
  const ref = useRef(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    script.setAttribute("async", "true");
    document.head.appendChild(script);
    window.twttr?.widgets?.load(ref.current);
    return () => {
      document.head.removeChild(script);
    };
  }, [searchParams]);

  return <div ref={ref}></div>;
};
