"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

type Props = {
  current: number;
  total: number;
} & HTMLAttributes<HTMLElement>;

/**
 * ページネーションコンポーネント
 * 引数として現在のページと総ページ数を受け取る
 * 現在のページが1ページ目の場合は前へボタンを無効化
 * 現在のページが最終ページの場合は次へボタンを無効化
 *
 * @param param0
 * @return
 */
export const Pagenation = ({ current, total, ...props }: Props) => {
  const pathname = usePathname();
  if (total <= 1) {
    return <></>;
  }

  const isFirstPage = current === 1;
  const isLastPage = current === total;

  const baseCSS = "flex items-center justify-center px-3 h-10 text-md border border-gray-300";
  const pageItem = `${baseCSS} bg-white text-gray-500 hover:bg-gray-100`;
  const active = `${baseCSS} bg-blue-300 text-gray-500 hover:bg-blue-400 active`;
  const disabled = `${baseCSS} bg-white text-gray-500 disabled pointer-events-none`;
  const ellipsis = <li className={disabled}>...</li>;

  const pageNumbers = (() => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    } else if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    } else if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    } else {
      return [1, "...", current - 2, current - 1, current, current + 1, current + 2, "...", total];
    }
  })();

  return (
    <nav aria-label="Page navigation" {...props}>
      <ul className="flex justify-center items-center">
        <Link href={`${pathname}?page=${current - 1}`} passHref>
          <li className={`rounded-l-md ${isFirstPage ? disabled : pageItem}`}>前へ</li>
        </Link>

        {pageNumbers.map((pageNumber, i) => {
          if (pageNumber === "...") {
            return ellipsis;
          }
          return (
            <Link key={i} href={`${pathname}?page=${pageNumber}`} passHref>
              <li className={current === pageNumber ? active : pageItem}>{pageNumber}</li>
            </Link>
          );
        })}

        <Link href={`${pathname}?page=${current + 1}`} passHref>
          <li className={`rounded-r-md ${isLastPage ? disabled : pageItem}`}>次へ</li>
        </Link>
      </ul>
    </nav>
  );
};
