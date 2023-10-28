import { TextLink } from "@/components";

type LinkItem = {
  href: string;
  text: string;
};

type LinkItems = LinkItem[];

const linkItems: LinkItems[] = [
  [
    { href: "/", text: "TOP" },
    { href: "/event/latest", text: "最新のイベント" },
    { href: "/twitter-webapp", text: "フォロワーのお品書き" },
  ],
  [
    { href: "/about", text: "このサイトについて" },
    { href: "/form", text: "お問い合わせ" },
  ],
];

export const Footer = () => {
  return (
    <footer className="bg-primary h-48 flex flex-col">
      <nav className="flex flex-col justify-center mt-8">
        {linkItems.map((items, i) => (
          <div key={i} className="flex justify-center">
            {items.map((item, j) => (
              <>
                <TextLink key={j} href={item.href}>
                  {item.text}
                </TextLink>
                {items.length - 1 !== j && <span className="mx-2">|</span>}
              </>
            ))}
          </div>
        ))}
      </nav>
      <small className="text-center mt-4">bmth All rights reserved</small>
    </footer>
  );
};
