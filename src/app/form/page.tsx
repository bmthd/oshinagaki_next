import { PaddingedText, TitleHeading } from "@/components/common";
import { MailForm } from "./MailForm";

const Page = () => {
  const texts = [
    "当サイトへのご意見、ご要望をこちらのフォームより受付しております。",
    "個人運営のため、回答にはお時間を頂く場合がありますので予めご了承ください。",
    "以下を入力して送信ボタンをクリックしてください。",
  ];

  return (
    <>
      <TitleHeading>お問い合わせ</TitleHeading>
      <PaddingedText texts={texts} />
      <MailForm />
    </>
  );
};

export default Page;
