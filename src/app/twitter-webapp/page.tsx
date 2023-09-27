"use client";

import { LinkButton, TitleHeading } from "@/components";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaTwitter } from "react-icons/fa";

const Page = () => {
  const { data: session } = useSession();
  return (
    <>
      <TitleHeading>フォロワーのお品書き取得ツール</TitleHeading>
      <div className="text-left">
        <p>
          {/* あなたのTwitterでフォローしているサークル、またはフォローされているサークルのお品書きを自動でまとめます。 */}
          TwitterAPIの仕様変更により、フォロワーの取得ができなくなってしまったため、現在は利用できません。
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
    </>
  );
};

export default Page;
