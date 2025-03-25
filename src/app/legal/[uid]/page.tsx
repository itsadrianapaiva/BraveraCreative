import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

export default async function LegalPage({
  params,
}: {
  params: { uid: string };
}) {
  const client = createClient();
  const legalPage = await client.getByUID("legal_page", params.uid);

  if (!legalPage) {
    notFound();
  }

  return (
    <Bounded as="article">
      <div className="mx-auto">
        <SliceZone slices={legalPage.data.slices} components={components} />
      </div>
    </Bounded>
  );
}
