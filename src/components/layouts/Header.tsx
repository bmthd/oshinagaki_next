import { Breadcrumb } from "@/components/layouts/Breadcrumb";
import { H } from "@/components/structure/H";
import Link from "next/link";

export const Header = () => {
  const title = (
    <>
      <span>コミケお品書きツイート</span>
      <span>まとめサイト</span>
    </>
  );
  return (
    <>
      <header className="flex items-center justify-center bg-primary text-white h-48">
        <H className="lg:text-5xl max-lg:text-4xl font-bold">
          <Link href="/" className="flex max-lg:flex-col items-center">
            {title}
          </Link>
        </H>
      </header>
      <Breadcrumb />
    </>
  );
};
