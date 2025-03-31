import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { asText } from "@prismicio/client"; // Add this import

type Params = { uid: string; lang: "en" | "pt-br" };

export default async function LegalPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { uid, lang } = await params;
  const client = createClient();
  const finalUid = lang === "en" ? uid : `${uid}-pt-br`;
  const prismicLang = lang === "en" ? "en-us" : "pt-br";
  const page = await client
    .getByUID("legal_page", finalUid, { lang: prismicLang })
    .catch(() => notFound());

  const privacyLink = `/${lang}/legal/privacy`;

  return (
    <Bounded as="article">
      <div className="mx-auto">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
      <p className="bg-gray-100/30 p-4 text-center text-sm">
        By using this site, you agree to our{" "}
        <Link href={privacyLink} className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </Bounded>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid, lang } = await params;
  const client = createClient();
  const finalUid = lang === "en" ? uid : `${uid}-pt-br`;
  const prismicLang = lang === "en" ? "en-us" : "pt-br";
  const page = await client
    .getByUID("legal_page", finalUid, { lang: prismicLang })
    .catch(() => notFound());

  return {
    title: asText(page.data.meta_title),
    description: asText(page.data.meta_description),
    openGraph: {
      images: [{ url: page.data.meta_image?.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  return [
    { uid: "privacy", lang: "en" as const },
    { uid: "privacy", lang: "pt-br" as const },
    { uid: "terms", lang: "en" as const },
    { uid: "terms", lang: "pt-br" as const },
  ];
}
