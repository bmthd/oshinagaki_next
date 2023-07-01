import Link from "next/link";

export const Header = () => {
  const title = "コミケお品書きツイートまとめサイト";
  return (
    <>
      <header className="flex items-center justify-center bg-primary text-white h-48">
        <h1 className="lg:text-5xl max-lg:text-3xl font-bold">
          <Link href="/">{title}</Link>
        </h1>
      </header>
      <Breadcrumb />
    </>
  );
};

const Breadcrumb = () => {
  return (
    <nav>
      <ol className="breadcrums">
        <li>
          <a href="/">トップ</a>
        </li>
        <li>
          <script>document.write(document.title)</script>
        </li>
      </ol>
    </nav>
  );
};
