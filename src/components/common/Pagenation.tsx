"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

/**
 * ページネーションコンポーネント<p>
 * 引数として現在のページと総ページ数を受け取る<p>
 * 現在のページが1ページ目の場合は前へボタンを無効化<p>
 * 現在のページが最終ページの場合は次へボタンを無効化<p>
 *
 * @param param0
 * @returns
 */
export const Pagenation = ({
	current,
	total,
	...props
}: {
	current: number;
	total: number;
} & HTMLAttributes<HTMLElement>) => {
	const pathname = usePathname();
	if (total === 1) {
		return <></>;
	}
	const pageItem =
		"flex items-center justify-center px-3 h-10 text-md leading-tight border border-gray-300 bg-white text-gray-500 hover:bg-gray-100";
	const active =
		"flex items-center justify-center px-3 h-10 text-md leading-tight border border-gray-300 bg-blue-300 text-gray-500 hover:bg-blue-400 active";
	const disabled =
		"flex items-center justify-center px-3 h-10 text-md leading-tight border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled";
	return (
		<nav aria-label="Page navigation" {...props}>
			<ul className="pagination flex justify-center items-center">
				<Link href={`${pathname}?page=${current - 1}`}>
					<li className={`rounded-l-md ${current === 1 ? disabled : pageItem}`}>前へ</li>
				</Link>
				{Array.from({ length: total }).map((_, i) => {
					return (
						<Link key={i} href={`${pathname}?page=${i + 1}`}>
							<li className={current === i + 1 ? active : pageItem}>{i + 1}</li>
						</Link>
					);
				})}
				<Link href={`${pathname}?page=${current + 1}`}>
					<li className={`rounded-r-md ${current === total ? disabled : pageItem}`}>次へ</li>
				</Link>
			</ul>
		</nav>
	);
};
