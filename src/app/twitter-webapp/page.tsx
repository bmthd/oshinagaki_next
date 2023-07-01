"use client";

import { H2, LinkButton } from "@/components/common";
import { FaTwitter } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  return (
    <>
      <H2>フォロワーのお品書き取得ツール</H2>
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
