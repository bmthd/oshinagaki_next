"use client";

import { Footer, Header } from "@/components/layouts";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import "./global.css";
import { BIZ_UDPGothic } from "next/font/google";
import { SessionProvider } from "next-auth/react"

export const metadata = {
  title: "コミケお品書きツイートまとめサイト",
  description:"コミックマーケットのお品書きツイートをまとめて掲載しています。新刊情報やサークル情報を一覧で確認できます。",
  keywords:"コミックマーケット, お品書き, 新刊情報, サークル情報",
  language:"ja",
  "og:url": "https://oshinagaki.bmth.dev",
  "og:type": "website",
  "og:title": "コミケお品書きツイートまとめサイト",
  "og:description":"コミックマーケットのお品書きツイートをまとめて掲載しています。新刊情報やサークル情報を一覧で確認できます。",
  "og:image": "https://oshinagaki.bmth.dev/ogp.png",
  "twitter:card": "summary_large_image",
}

const font = BIZ_UDPGothic({
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
  adjustFontFallback: true,
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={font.className}>
      <body>
        <Header />
        <div className="w-main mx-auto">
          <RecoilRoot>{children}</RecoilRoot>
        </div>
        <Footer />
      </body>
    </html>
  );
}
