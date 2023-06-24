"use client"

import { useState } from "react";
import { LinkButton } from "./common/LinkButton";
import { Day, District, Event } from "types/dbTypes";

// 全サークル一覧の選択フォームを表示するコンポーネント
interface Props {
  event: Event;
}

export const BlockListForm = (props:Props) => {
    const [selectedDistrict,setSelectedDistrict] = useState(0);
    const [selectedDayCount,setSelectedDayCount] = useState("1");
    const [selectedBlock,setSelectedBlock] = useState("A");
    const days:Day[] = [{ id: 1, dayCount: 1 }, { id: 2, dayCount: 2 }];
    // const districts = event.district;
    const districts:District[] = [{ id: 1, name: "東123ホール",halls:["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
		"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ"], }, { id: 2, name: "東456ホール", halls:["シ",
		"ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "パ", "ヒ", "ピ", "フ",
		"プ", "ヘ", "ペ", "ホ", "ポ", "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ"]}, { id: 3, name: "東789ホール",halls:["あ", "い", "う", "え", "お", "か", "き", "く", "け",
		"こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ",
		"ふ", "へ", "ほ", "ま", "み", "む", "め"] }];

    return (
      <div>
        <div className="text-center">全サークル一覧</div>
        <form className="text-center" name="page-selecter" id="page-selecter">
          <label htmlFor="day" aria-label="日にち">
            日にち
          </label>
          <select>
            {days.map((day:any) => {
              return (
                <option key={day.id} value={day.dayCount}>
                  {day.dayCount}日目
                </option>
              );
            }
            )}
          </select>
          <label htmlFor="district" aria-label="地区">
            地区
          </label>
          <select className="select-district" >
            {districts.map((district) => {
              return (
                <option key={district.id} value={district.id} onSelect={() => setSelectedDistrict(district.id)}>
                  {district.name}
                </option>
              );
            }
            )}
          </select>
          <label htmlFor="block" aria-label="ブロック">
            ブロック
          </label>
          <select className="select-block" id="block" name="block">

          </select>
          <LinkButton href={"/"} > Go</LinkButton>
        </form>
      </div>
    );
  }