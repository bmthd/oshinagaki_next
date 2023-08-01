import { BlockListFormContainer, WallList } from "@/components";
import { Section, TitleHeading } from "@/components/common";
import { convertToNumber } from "@/lib/util";
import { fetchEvent } from "@/services/eventService";
import { Suspense } from "react";
import { SpacesContainer } from "../_components";

export const dynamic = "auto";

export const dynamicParams = true;

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
  searchParams?: { page?: "string"; size?: string };
}) => {
  const eventId = params.eventId;
  const page = convertToNumber(searchParams!.page!) || 1;
  const size = convertToNumber(searchParams!.size!) || 38;
  const suspenseKey = `${eventId}-${page}-${size}`;

  const event = await fetchEvent(eventId);
  const pageTitle = `${eventId} 話題のサークルランキング`;

  return (
    <Section className="m-2">
      <TitleHeading>{pageTitle}</TitleHeading>
      <Suspense key={suspenseKey} fallback={<div>loading...</div>}>
        <SpacesContainer eventId={eventId} page={page} size={size} />
      </Suspense>
      <div className="max-w-md mx-auto">
        <WallList eventId={eventId} />
        <BlockListFormContainer eventId={eventId} />
      </div>
    </Section>
  );
};

export default page;
