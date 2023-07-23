"use client";

import { LinkButton, SelectBox } from "@/components/common";
import { Day, Event } from "@prisma/client";
import { FormEvent, useState } from "react";
import { H2 } from "./common";

interface District {
	id: number;
	name: string;
	blocks: string[];
}

interface BlockListFormInnerProps {
	event: Event;
	days: Day[];
}

const useBlockListFormState = (event: Event, days: Day[]) => {
	const eventId = event.id;
	const [selectedDayCount, setSelectedDayCount] = useState("1");
	const [selectedDistrict, setSelectedDistrict] = useState(0);
	const [selectedBlock, setSelectedBlock] = useState("A");

	const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const districtId = Number(e.target.value);
		setSelectedDistrict(districtId);
	};

	const handleDayCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const dayCount = e.target.value;
		setSelectedDayCount(dayCount);
	};

	const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const block = e.target.value;
		setSelectedBlock(block);
	};

	return {
		eventId,
		selectedDayCount,
		selectedDistrict,
		selectedBlock,
		days,
		handleDistrictChange,
		handleDayCountChange,
		handleBlockChange,
	};
};

const generateUrl = (eventId: string, dayCount: string, block: string) => {
	return `/event/${eventId}/day/${dayCount}/block/${block}`;
};

/**
 * イベントと日にち情報を受け取り、ブロック一覧フォームを表示するコンポーネント
 * @param param0
 * @returns
 */
const BlockListFormInner = ({ event, days }: BlockListFormInnerProps) => {
	const {
		eventId,
		selectedDayCount,
		selectedDistrict,
		selectedBlock,
		handleDistrictChange,
		handleDayCountChange,
		handleBlockChange,
	} = useBlockListFormState(event, days);

	const districts = [
		{
			id: 0,
			name: "東123",
			blocks: [
				"A",
				"B",
				"C",
				"D",
				"E",
				"F",
				"G",
				"H",
				"I",
				"J",
				"K",
				"L",
				"M",
				"N",
				"O",
				"P",
				"Q",
				"R",
				"S",
				"T",
				"U",
				"V",
				"W",
				"X",
				"Y",
				"Z",
				"ア",
				"イ",
				"ウ",
				"エ",
				"オ",
				"カ",
				"キ",
				"ク",
				"ケ",
				"コ",
				"サ",
			],
		},
		{
			id: 1,
			name: "東456",
			blocks: [
				"シ",
				"ス",
				"セ",
				"ソ",
				"タ",
				"チ",
				"ツ",
				"テ",
				"ト",
				"ナ",
				"ニ",
				"ヌ",
				"ネ",
				"ノ",
				"ハ",
				"パ",
				"ヒ",
				"ピ",
				"フ",
				"プ",
				"ヘ",
				"ペ",
				"ホ",
				"ポ",
				"マ",
				"ミ",
				"ム",
				"メ",
				"モ",
				"ヤ",
				"ユ",
				"ヨ",
				"ラ",
				"リ",
				"ル",
				"レ",
				"ロ",
			],
		},
		{
			id: 2,
			name: "西12",
			blocks: [
				"あ",
				"い",
				"う",
				"え",
				"お",
				"か",
				"き",
				"く",
				"け",
				"こ",
				"さ",
				"し",
				"す",
				"せ",
				"そ",
				"た",
				"ち",
				"つ",
				"て",
				"と",
				"な",
				"に",
				"ぬ",
				"ね",
				"の",
				"は",
				"ひ",
				"ふ",
				"へ",
				"ほ",
				"ま",
				"み",
				"む",
				"め",
			],
		},
	];

	return (
		<div>
			<H2>ブロック一覧</H2>
			<form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
				<label htmlFor="day" aria-label="日にち">
					日にち
				</label>
				<SelectBox value={selectedDayCount} onChange={handleDayCountChange}>
					{days.map((day) => (
						<option key={day.id} value={day.dayCount}>
							{day.dayCount}日目
						</option>
					))}
				</SelectBox>
				<label htmlFor="district" aria-label="地区">
					地区
				</label>
				<SelectBox value={selectedDistrict} onChange={handleDistrictChange}>
					{districts.map((district) => (
						<option key={district.id} value={district.id}>
							{district.name}
						</option>
					))}
				</SelectBox>
				<label htmlFor="block" aria-label="ブロック">
					ブロック
				</label>
				<SelectBox value={selectedBlock} onChange={handleBlockChange}>
					{districts[selectedDistrict].blocks.map((block) => (
						<option key={block} value={block}>
							{block}
						</option>
					))}
				</SelectBox>
			</form>
			<LinkButton href={generateUrl(eventId, selectedDayCount, selectedBlock)}>
				選択したブロックに移動
			</LinkButton>
			<LinkButton href={`/event/${event.id}/block_list`}>{event.id} ブロック一覧</LinkButton>
		</div>
	);
};

export default BlockListFormInner;
