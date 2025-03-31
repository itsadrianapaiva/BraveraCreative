// app/[lang]/page.tsx
import { type Metadata } from "next";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: "en" | "pt-br" }>;
}) {
  const { lang } = await params;
  const client = createClient();
  const home = await client
    .getByUID("page", "home", { lang: lang === "en" ? "en-us" : "pt-br" })
    .catch(() => null);

  if (!home) {
    notFound();
  }

  return <SliceZone slices={home.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "pt-br" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const client = createClient();
  const home = await client
    .getByUID("page", "home", { lang: lang === "en" ? "en-us" : "pt-br" })
    .catch(() => null);

  if (!home) {
    return {};
  }

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "pt-br" },
  ];
}