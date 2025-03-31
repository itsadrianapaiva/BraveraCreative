//This page allows anyone to create a brand new page without having a developer come in and create more files.

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { asText, filter } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string; lang: "en" | "pt-br" };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid, lang } = await params;
  const client = createClient();

  // Determine the UID based on language
  const finalUid = lang === "en" ? uid : `${uid}-pt-br`;
  const prismicLang = lang === "en" ? "en-us" : "pt-br";

  // Fetch the page
  const page = await client
    .getByUID("page", finalUid, { lang: prismicLang })
    .catch(() => notFound());

  // <SliceZone> renders the page's slices.
  return <SliceZone slices={page.data.slices} components={components} />;
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
    title: asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();

  // Get all pages from Prismic, except the homepage.
  const pagesEn = await client.getAllByType("page", {
    filters: [filter.not("my.page.uid", "home")],
    lang: "en-us",
  });
  const pagesPt = await client.getAllByType("page", {
    filters: [filter.not("my.page.uid", "home-pt-br")],
    lang: "pt-br",
  });

  // Combine and map to paths
  return [
    ...pagesEn.map((page) => ({ uid: page.uid, lang: "en" as const })),
    ...pagesPt.map((page) => ({
      uid: page.uid.replace("-pt-br", ""),
      lang: "pt-br" as const,
    })),
  ];
}
