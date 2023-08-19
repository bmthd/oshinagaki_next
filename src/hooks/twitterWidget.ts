"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const useTwitterWidgets = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadTwitterWidgets = () => {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => window.twttr?.widgets.load();
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    };

    const cleanup = loadTwitterWidgets();

    return () => {
      cleanup();
    };
  }, [searchParams]);
};
