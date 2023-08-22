"use client";

import { LinkButton, SelectBox, TitleHeading } from "@/components/common";
import { Day, Event } from "@/lib/prisma";
import { BlocksWithDistrict } from "@/services/eventService";
import { FormEvent, useEffect, useState } from "react";

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
  const [dayCount, setDayCount] = useState(1);
  const [district, setDistrict] = useState(0);
  const [block, setBlock] = useState("A");

  useEffect(() => {
    setDistrict(districts[0].id);
    setBlock(districts[0].halls[0].blocks[0].name);
  }, [districts]);

  const generatedUrl = `/event/${eventId}/day/${dayCount}/block/${block}`;

  const dayOptions = days.map((day) => {
    return (
      <option key={day.id} value={day.count}>
        {`${day.count}日目`}
      </option>
    );
  });

  const districtOptions = districts.map((district) => {
    return (
      <option key={district.id} value={district.id}>
        {`${district.name}ホール`}
      </option>
    );
  });

  const blockOptions = districts
    .find((d) => d.id === district)
    ?.halls.flatMap((hall) =>
      hall.blocks.map((block) => (
        <option key={block.id} value={block.name}>
          {block.name}
        </option>
      ))
    );

  const handleDayCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDayCount = Number(e.target.value);
    setDayCount(selectedDayCount);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = Number(e.target.value);
    setDistrict(districtId);
    const block = districts.find((district) => district.id === districtId)?.halls[0].blocks[0]
      .name!;
    setBlock(block);
  };

  const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const block = e.target.value;
    setBlock(block);
  };

  return (
    <div>
      <TitleHeading>ブロック一覧</TitleHeading>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <label htmlFor="day" aria-label="日にち">
          日にち
        </label>
        <SelectBox value={dayCount} onChange={handleDayCountChange}>
          {dayOptions}
        </SelectBox>
        <label htmlFor="district" aria-label="地区">
          地区
        </label>
        <SelectBox value={district} onChange={handleDistrictChange}>
          {districtOptions}
        </SelectBox>
        <label htmlFor="block" aria-label="ブロック">
          ブロック
        </label>
        <SelectBox value={block} onChange={handleBlockChange}>
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
