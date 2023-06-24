import { BiChevronUp } from "react-icons/bi";
import { PageTopButton } from "../common/PageTopButton";

export const Footer = () => {
  return (
    <footer className="bg-primary h-48">
      <div className="footer-menu">
        <nav>
          <a href="/"> TOP </a> | <a href="/latest"> 最新のイベント </a> |{" "}
          <a href="/twitter-webapp"> フォロワーのお品書き</a>
          <a href="/about">このサイトについて</a> |{" "}
          <a href="/form">お問い合わせ</a>
        </nav>
      </div>
      <p>bmth All rights reserved</p>
      <PageTopButton />
    </footer>
  );
};
