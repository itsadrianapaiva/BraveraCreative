import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";

type Params = { uid: string; lang: "en" | "pt-br" };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid, lang } = await params;
  const client = createClient();
  const finalUid = lang === "en" ? uid : `${uid}-pt-br`;
  const prismicLang = lang === "en" ? "en-us" : "pt-br";
  const page = await client
    .getByUID("page", finalUid, { lang: prismicLang })
    .catch(() => notFound());

  return (
    <Bounded as="article">
      <div className="mx-auto">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
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
    .getByUID("page", finalUid, { lang: prismicLang })
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  return [
    { uid: "contact", lang: "en" as const },
    { uid: "contact", lang: "pt-br" as const },
  ];
}
