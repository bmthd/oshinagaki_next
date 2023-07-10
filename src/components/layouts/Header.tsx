"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { Breadcrumb } from "./Breadcrumb";

export const Header = () => {
  const segments = useSelectedLayoutSegments();
  const title = (
    <>
      <span>コミケお品書きツイート</span>
      <span>まとめサイト</span>
    </>
  );
  return (
    <>
      <header className="flex items-center justify-center bg-primary text-white h-48">
        <h1 className="lg:text-5xl max-lg:text-5xl font-bold">
          <Link href="/" className="flex max-lg:flex-col items-center">{title}</Link>
        </h1>
      </header>
      <Breadcrumb segments={segments} />
    </>
  );
};
