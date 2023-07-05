import { TextLink } from "../common/TextLink";
import { FaAngleRight } from "react-icons/fa";

/**
 * パンくずリストのコンポーネント<p>
 * 引数として、パンくずリストの文字列配列を受け取る<p>
 * 例: ["event", "C100",'day','1']<p>
 * 受け取った配列を展開し、それぞれの階層に対応するリンクを生成する<p>　
 * @param param0 
 * @returns 
 */
export const Breadcrumb = async ({ segments }: { segments: string[] }) => {
  return (
    <nav>
      <ol className="flex ml-4 items-center overflow-x-scroll" aria-label="breadcrumb">
        <li key={'/'}>
          <TextLink href="/">トップ</TextLink>
        </li>
        {segments.map((segment, index) => {
          const url = segments.slice(0, index + 1).join("/");
          return (
            <>
              <FaAngleRight className="text-gray-500 mx-4" size={20}/>
              <li key={index}>
                <TextLink href={`/${url}`}>{segment}</TextLink>
              </li>
            </>
          );
        })}
      </ol>
    </nav>
  );
};
