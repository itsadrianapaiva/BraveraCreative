import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";

export default async function Page({ params }: { params: Promise<{ lang: "en" | "pt-br" }> }) {
  const { lang } = await params;
  const client = createClient();
  const prismicLang = lang === "en" ? "en-us" : "pt-br";
  const page = await client
    .getByUID("page", "aboutus", { lang: prismicLang })
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
  params: Promise<{ lang: "en" | "pt-br" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const client = createClient();
  const prismicLang = lang === "en" ? "en-us" : "pt-br";
  const page = await client
    .getByUID("page", "aboutus", { lang: prismicLang })
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
    { lang: "en" as const },
    { lang: "pt-br" as const },
  ];
}