"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { Breadcrumb } from "./Breadcrumb";

export const Header = () => {
  const segments = useSelectedLayoutSegments();
  const title = "コミケお品書きツイートまとめサイト";
  return (
    <>
      <header className="flex items-center justify-center bg-primary text-white h-48">
        <h1 className="lg:text-5xl max-lg:text-3xl font-bold">
          <Link href="/">{title}</Link>
        </h1>
      </header>
      <Breadcrumb segments={segments} />
    </>
  );
};

