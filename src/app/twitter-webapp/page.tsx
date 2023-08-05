"use client";

import { TitleHeading } from "@/components/common";
import { useSession } from "next-auth/react";

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
        {/* {!session ? (
          <LinkButton onClick={() => signIn("twitter")}>
            <FaTwitter size={24} />
            Twitterでログイン
          </LinkButton>
        ) : (
          <LinkButton onClick={() => signOut()}>サインアウト</LinkButton>
        )} */}
      </div>
    </>
  );
};

export default Page;
