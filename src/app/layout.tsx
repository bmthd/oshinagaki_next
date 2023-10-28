import { Spinner } from "@/components";
import { Container, Footer, GoogleAnalytics, Header, Providers } from "@/components/layouts";
import { Metadata } from "next";
import { BIZ_UDPGothic } from "next/font/google";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./global.css";

export const metadata: Metadata = {
  title: "コミケお品書きツイートまとめサイト",
  description:
    "コミックマーケットのお品書きツイートをまとめて掲載しています。新刊情報やサークル情報を一覧で確認できます。",
  keywords: "コミックマーケット, お品書き, 新刊情報, サークル情報",
  openGraph: {
    url: "https://oshinagaki.bmth.dev",
    title: "コミケお品書きツイートまとめサイト",
    description:
      "コミックマーケットのお品書きツイートをまとめて掲載しています。新刊情報やサークル情報を一覧で確認できます。",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "コミケお品書きツイートまとめサイト",
    description:
      "コミックマーケットのお品書きツイートをまとめて掲載しています。新刊情報やサークル情報を一覧で確認できます。",
  },
};

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
    <Providers>
      <html lang="ja" className={`bg-gray-100 text-blue-900 scroll-smooth ${font.className}`}>
        <body>
          {/* <GoogleTagManager gtmId={process.env.TRACKING_ID!} /> */}
          <GoogleAnalytics />
          <Header />
          <Container>
            <ErrorBoundary fallback={<div>存在しないページです。</div>}>
              <Suspense fallback={<Spinner />}>{children}</Suspense>
            </ErrorBoundary>
          </Container>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
