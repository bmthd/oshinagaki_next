"use client";
import { TextField } from "@/components/common";
import { useRef, useState } from "react";
import { processFormData } from "./serverAction";

export const MailForm = () => {
  const [isSending, setIsSending] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSending(true);
    const result = await processFormData(formData);
    if (result) {
      ref.current?.reset();
      alert("送信しました。");
    } else {
      alert("送信に失敗しました。");
    }
    setIsSending(false);
  };

  return (
    <form ref={ref} action={handleSubmit}>
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
          disabled={isSending}
          className="w-32 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-30">
          送信
        </button>
      </div>
    </form>
  );
};
