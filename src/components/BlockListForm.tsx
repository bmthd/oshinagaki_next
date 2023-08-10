"use client";

import { LinkButton, SelectBox, TitleHeading } from "@/components/common";
import { BlocksWithDistrict } from "@/services/eventService";
import { Day, Event } from "@prisma/client";
import { FormEvent, useState } from "react";

type Props = {
  /**イベント名 */
  event: Event;
  days: Day[];
  districts: BlocksWithDistrict;
};

/**
 * イベントと日にち情報を受け取り、ブロック一覧フォームを表示するコンポーネント
 */
export const BlockListForm = ({ event, days, districts }: Props) => {
  const eventId = event.id;
  const [selectedDayCount, setSelectedDayCount] = useState("1");
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [selectedBlock, setSelectedBlock] = useState("A");

  const handleDayCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dayCount = e.target.value;
    setSelectedDayCount(dayCount);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = Number(e.target.value);
    setSelectedDistrict(districtId);
  };

  const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const block = e.target.value;
    setSelectedBlock(block);
  };

  const generatedUrl = `/event/${eventId}/day/${selectedDayCount}/block/${selectedBlock}`;

  const dayOptions = days.map((day) => {
    return (
      <option key={day.id} value={day.dayCount}>
        {day.dayCount}
      </option>
    );
  });

  const districtOptions = districts.map((district) => {
    return (
      <option key={district.id} value={district.id}>
        {district.name}
      </option>
    );
  });

  const blockOptions = districts[selectedDistrict].halls.map((hall) => {
    return hall.blocks.map((block) => {
      return (
        <option key={block.id} value={block.name}>
          {block.name}
        </option>
      );
    });
  });

  return (
    <div>
      <TitleHeading>ブロック一覧</TitleHeading>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <label htmlFor="day" aria-label="日にち">
          日にち
        </label>
        <SelectBox value={selectedDayCount} onChange={handleDayCountChange}>
          {dayOptions}
        </SelectBox>
        <label htmlFor="district" aria-label="地区">
          地区
        </label>
        <SelectBox value={selectedDistrict} onChange={handleDistrictChange}>
          {districtOptions}
        </SelectBox>
        <label htmlFor="block" aria-label="ブロック">
          ブロック
        </label>
        <SelectBox value={selectedBlock} onChange={handleBlockChange}>
          {blockOptions}
        </SelectBox>
      </form>
      <div className="flex flex-col items-center justify-center py-2">
        <LinkButton className="w-full m-2" href={generatedUrl}>
          選択したブロックに移動
        </LinkButton>
        <LinkButton className="w-full m-4" href={`/event/${eventId}/block_list`}>
          {event.id} ブロック一覧
        </LinkButton>
      </div>
    </div>
  );
};
