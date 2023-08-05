import { PaddingedText, TextField, TitleHeading } from "@/components/common";
import sendMail from "@/lib/nodemailer";
import { FormEvent } from "react";

interface SubmitData {
  email: string;
  message: string;
}

interface CustomFormData extends FormData {
  append<T extends string | Blob>(name: keyof SubmitData, value: T, fileName?: string): void;
}

const formData = new FormData() as CustomFormData;

const page = () => {
  const texts = [
    "当サイトへのご意見、ご要望をこちらのフォームより受付しております。",
    "個人運営のため、回答にはお時間を頂く場合がありますので予めご了承ください。",
    "以下を入力して送信ボタンをクリックしてください。",
  ];

  const onAction = async (formData: FormEvent<HTMLFormElement>) => {
    "use server";
    formData.preventDefault();
    const email = formData.currentTarget.email.value;
    const message = formData.currentTarget.message.value;
    await sendMail(email, message);
  };

  return (
    <>
      <TitleHeading>お問い合わせ</TitleHeading>
      <PaddingedText texts={texts} />
      <form onSubmit={onAction}>
        <div className="mb-4 max-w-sm">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            メールアドレス
          </label>
          <TextField
            id="email"
            name="email"
            type="email"
            className="w-full"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="mb-4 max-w-screen-md">
          <label htmlFor="message">お問い合わせ内容</label>
          <textarea
            id="message"
            className="w-full h-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            placeholder="お問い合わせ内容を入力してください。"
            name="message"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-32 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            送信
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
