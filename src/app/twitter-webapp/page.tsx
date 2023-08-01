"use client";

import { LinkButton, TitleHeading } from "@/components/common";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaTwitter } from "react-icons/fa";

const Page = () => {
  const { data: session } = useSession();
  return (
    <>
      <TitleHeading>フォロワーのお品書き取得ツール</TitleHeading>
      <div className="text-left">
        <p>
          あなたのTwitterでフォローしているサークル、またはフォローされているサークルのお品書きを自動でまとめます。
        </p>
      </div>
      <div className="text-center">
        {!session ? (
          <LinkButton onClick={() => signIn("twitter")}>
            <FaTwitter size={24} />
            Twitterでログイン
          </LinkButton>
        ) : (
          <LinkButton onClick={() => signOut()}>サインアウト</LinkButton>
        )}
      </div>
      <div></div>
    </>
  );
};

export default Page;
