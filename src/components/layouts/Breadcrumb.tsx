"use client";

import { TextLink } from "@/components/common";
import { useSelectedLayoutSegments } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

/**
 * パンくずリストのコンポーネント
 * セグメントを展開し、それぞれの階層に対応するリンクを生成する
 * 例: トップ > C100 > 1日目 > Aブロック
 * @param param0
 * @returns
 */
export const Breadcrumb = () => {
  const segments = useSelectedLayoutSegments();
  const segmentsWithUrl = segments.map((segment, index) => {
    const url = segments.slice(0, index + 1).join("/");
    return { segment: segment, url: url };
  });
  const excludeSegments = ["event", "day", "block", "space", "circle", "wall"];
  const filteredSegments = segmentsWithUrl.filter(
    (segment) => !excludeSegments.includes(segment.segment)
  );

  return (
    <nav>
      <ol className="flex ml-4 items-center overflow-x-scroll" aria-label="breadcrumb">
        <li key={"/"}>
          <TextLink href="/">トップ</TextLink>
        </li>
        {filteredSegments.map((segment, index) => {
          return (
            <>
              <FaAngleRight className="text-gray-500 mx-4" size={20} />
              <li key={index}>
                <TextLink href={`/${segment.url}`}>{decodeURIComponent(segment.segment)}</TextLink>
              </li>
            </>
          );
        })}
      </ol>
    </nav>
  );
};
