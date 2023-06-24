import { H2 } from "@/components/common/H2";
import { LinkButton } from "@/components/common/LinkButton";
import { FaTwitter } from "react-icons/fa";

const page = () => {
  return (
    <>
      <H2>フォロワーのお品書き取得ツール</H2>
      <div className="text-left">
        <p>
          あなたのTwitterでフォローしているサークル、またはフォローされているサークルのお品書きを自動でまとめます。
        </p>
      </div>
      <div className="text-center">
        <LinkButton href="/twitter-webapp/login">
          <FaTwitter size={24} />
          Twitterでログイン
        </LinkButton>
      </div>
    </>
  );
};

export default page;
