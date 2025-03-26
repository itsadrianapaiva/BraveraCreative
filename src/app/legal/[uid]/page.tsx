import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const client = createClient();
  const legalPage = await client.getByUID("legal_page", uid);

  if (!legalPage) {
    notFound();
  }

  return (
    <Bounded as="article">
      <div className="mx-auto">
        <SliceZone slices={legalPage.data.slices} components={components} />
      </div>
      <p className="bg-gray-100/30 p-4 text-center text-sm">
        By using this site, you agree to our{" "}
        <Link href="/legal/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </Bounded>
  );
}
