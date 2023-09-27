import { DotHeading, PaddingedText, Section, TextLink, TitleHeading } from "@/components";

const Page = () => {
  const texts = [
    "以前、はてなブログで壁サークルのお品書きを手作業でまとめていました。",
    "好評でしたが、作業量があまりにも膨大で多くの時間が必要だったため、やめてしまいました。",
    "ずっと自動化したいと考えていましたが、この度ITエンジニアに転職し、実現の見込みが立ったため、自己学習もかねて専用サイトとして立ち上げました。",
    "自分がほしい機能が、コミケWebカタログや類似サイトに存在しなかったためそれがモチベーションに繋がりスキルアップとしても非常に役立ちました。",
    "デザインや使いやすさにこだわり、自分で使って便利だという実感があるのでとても手応えを感じています。ぜひ使ってみてください！",
  ];

  const text2 = [
    "TwitterAPIを使っています。",
    "スペースの特定には、ユーザー名を正規表現に当てはめる方法と、当落ツイートの検索の2通りの方法を使っています。",
    "告知ツイートの特定は、特定したスペースの固定ツイートを優先し、なければ関連ワードを含む画像付きツイートとし、検索しています。",
    "そのため当サイトに掲載希望のサークル様はコミケWebカタログのサークル情報編集画面からツイートできる配置結果ツイートを投稿いただければと思います。",
    "お品書きツイートのプロフィールへの固定もよろしくお願いします。",
  ];
  const link = (
    <TextLink href="https://amzn.to/3cSfuFq">
      Amazonギフト券- Eメールタイプ – Amazonベーシック
    </TextLink>
  );
  const text3 = [
    "このサイトは無料で利用できますが、サーバー代やドメイン代などの維持費がかかっています。",
    "下記リンクからAmazonギフト券をご購入いただけます。",
    "もし当サイトの支援をしても良いよという方はAmazonギフト券を下記アドレス宛に購入いただけると嬉しいです。",
    link,
  ];

  const mailto = (
    <TextLink href="mailto:jougennotuki67@gmail.com">jougennotuki67@gmail.com</TextLink>
  );

  return (
    <>
      <TitleHeading>このサイトについて</TitleHeading>
      <Section className="m-2">
        <PaddingedText texts={texts} />
        <DotHeading>このサイトの仕組み</DotHeading>
        <Section className="m-2">
          <PaddingedText texts={text2} />
        </Section>
        <DotHeading>投げ銭のお願い</DotHeading>
        <Section className="m-2">
          <PaddingedText texts={text3} />
        </Section>
        <DotHeading>連絡先</DotHeading>
        <Section className="m-2">
          <PaddingedText texts={[mailto]} />
        </Section>
      </Section>
    </>
  );
};

export default Page;
