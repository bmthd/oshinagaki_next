"use client";

import { Footer, Header } from "@/components/layouts";
import { ReactNode } from "react";
import "./global.css";
import { Metadata } from "next";
import { BIZ_UDPGothic } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

const font = BIZ_UDPGothic({
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
  adjustFontFallback: true,
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "コミケお品書きツイートまとめサイト",
//   description:
//     "コミックマーケットのお品書きツイートをまとめて掲載しています。新刊情報やサークル情報を一覧で確認できます。",
//   keywords: "コミックマーケット, お品書き, 新刊情報, サークル情報",
//   twitter: {
//     card: "summary_large_image",
//   },
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <html lang="ja" className={font.className}>
          <body>
            <Header />
            <div className="w-main mx-auto">{children}</div>
            <Footer />
          </body>
        </html>
      </RecoilRoot>
    </SessionProvider>
  );
}
