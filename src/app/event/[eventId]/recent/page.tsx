import { BlockListFormContainer, WallList } from "@/app/_components";
import { SpacesContainer } from "@/app/event/[eventId]/_components";
import { Section, Spinner, TitleHeading } from "@/components";
import { convertToNumber } from "@/lib/util";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const revalidate = 86400;


const Page = async (props: {
  params: Promise<{ eventId: string }>;
  searchParams?: Promise<{ page?: string; size?: string }>;
}) => {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams || Promise.resolve({ page: undefined, size: undefined })
  ]);
  const { eventId } = params;
  const page = convertToNumber(searchParams?.page || '') || 1;
  const size = convertToNumber(searchParams?.size || '') || 38;
  const suspenseKey = `${eventId}-${page}-${size}`;

  const title = `${eventId} 最近更新されたサークル`;

  return (
    <>
      <TitleHeading>{title}</TitleHeading>
      <Section>
        <Suspense key={suspenseKey} fallback={<Spinner />}>
          <SpacesContainer {...{ eventId, page, size, type: "recent" }} />
        </Suspense>
        <div className="max-w-md mx-auto">
          <WallList eventId={eventId} />
          <BlockListFormContainer eventId={eventId} />
        </div>
      </Section>
    </>
  );
};

export default Page;
