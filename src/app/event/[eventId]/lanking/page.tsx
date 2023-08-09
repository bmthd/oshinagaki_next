import { BlockListFormContainer, WallList } from "@/components";
import { PaddingedText, Section, TitleHeading } from "@/components/common";
import { convertToNumber } from "@/lib/util";
import { Suspense } from "react";
import { SpacesContainer } from "../_components";

export const dynamic = "force-dynamic";

export const revalidate = 86400;

export const generateStaticParams = async ({
  params: { eventId },
}: {
  params: { eventId: string };
}) => {
  return [{ eventId: eventId }];
};

const page = async ({
  params,
  searchParams,
}: {
  params: { eventId: string };
  searchParams?: { page?: string; size?: string };
}) => {
  const eventId = params.eventId;
  const page = convertToNumber(searchParams!.page!) || 1;
  const size = convertToNumber(searchParams!.size!) || 38;
  const suspenseKey = `${eventId}-${page}-${size}`;
  const pageTitle = `${eventId} 話題のサークルランキング`;
  const description = [
    "このページではTwitter上で話題のサークルをまとめています。",
    "リツイート数の多い順に表示しています。",
  ];

  return (
    <Section className="m-2">
      <TitleHeading>{pageTitle}</TitleHeading>
      <PaddingedText texts={description} />
      <Suspense key={suspenseKey} fallback={<div>loading...</div>}>
        <SpacesContainer eventId={eventId} page={page} size={size} type="lanking" />
      </Suspense>
      <div className="max-w-md mx-auto">
        <WallList eventId={eventId} />
        <BlockListFormContainer eventId={eventId} />
      </div>
    </Section>
  );
};

export default page;
