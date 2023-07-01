import { PageTopButton } from "@/components/common";
import { TextLink } from "../common/TextLink";

export const Footer = () => {
  return (
    <footer className="bg-primary h-48 flex flex-col">
      <nav className="flex flex-col justify-center mt-8">
        <div className="flex justify-center">
          <TextLink href="/"> TOP </TextLink>
          <span className="mx-2">|</span>
          <TextLink href="/event/latest"> 最新のイベント </TextLink>
          <span className="mx-2">|</span>
          <TextLink href="/twitter-webapp"> フォロワーのお品書き</TextLink>
        </div>
        <div className="flex justify-center">
          <TextLink href="/about">このサイトについて</TextLink>
          <span className="mx-2">|</span>
          <TextLink href="/form">お問い合わせ</TextLink>
        </div>
      </nav>
      <p className="text-center mt-4">bmth All rights reserved</p>
      <PageTopButton />
    </footer>
  );
};
