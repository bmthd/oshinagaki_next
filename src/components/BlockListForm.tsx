"use client";

import { Day, Event } from "@prisma/client";
import { FormEvent, useState } from "react";
import { H2 } from "./common";
import { LinkButton } from "./common/LinkButton";
import { SelectBox } from "./common/SelectBox";

// 全サークル一覧の選択フォームを表示するコンポーネント

export const BlockListForm = ({ event, days }: { event: Event; days: Day[] }) => {
	const eventId = event.id;
	const [selectedDayCount, setSelectedDayCount] = useState("1");
	const [selectedDistrict, setSelectedDistrict] = useState(0);
	const [selectedBlock, setSelectedBlock] = useState("A");
	const [url, setUrl] = useState(
		`/event/${eventId}/day/${selectedDayCount}/block/${selectedBlock}`
	);

	const handleDistrictChange = (e: any) => {
		const districtId = e.target.value;
		setSelectedDistrict(districtId);
	};

	const handleDayCountChange = (e: any) => {
		const dayCount = e.target.value;
		setSelectedDayCount(dayCount);
		setUrl(`/event/${eventId}/day/${dayCount}/block/${selectedBlock}`);
	};

	const handleBlockChange = (e: any) => {
		const block = e.target.value;
		setSelectedBlock(block);
		setUrl(`/event/${eventId}/day/${selectedDayCount}/block/${block}`);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

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
		<>
			<H2>ブロック一覧</H2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="day" aria-label="日にち">
					日にち
				</label>
				<SelectBox value={selectedDayCount} onChange={handleDayCountChange}>
					{days.map((day: any) => {
						return (
							<option key={day.id} value={day.dayCount}>
								{day.dayCount}日目
							</option>
						);
					})}
				</SelectBox>
				<label htmlFor="district" aria-label="地区">
					地区
				</label>
				<SelectBox value={selectedDistrict} onChange={handleDistrictChange}>
					{districts.map((district) => {
						return (
							<option key={district.id} value={district.id}>
								{district.name}
							</option>
						);
					})}
				</SelectBox>
				<label htmlFor="block" aria-label="ブロック">
					ブロック
				</label>
				<SelectBox value={selectedBlock} onChange={handleBlockChange}>
					{districts[selectedDistrict].blocks.map((block) => {
						return (
							<option key={block} value={block}>
								{block}
							</option>
						);
					})}
				</SelectBox>
			</form>
			<LinkButton href={url}> 選択したブロックに移動</LinkButton>
			<LinkButton href={`/event/${event.id}/block_list`}>{event.id} ブロック一覧</LinkButton>
		</>
	);
};
