import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, asText } from "@prismicio/client";
import { PrismicText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import BackgroundVideo from "@/components/BackgroundVideo";

type Params = { uid: string; lang: "en" | "pt-br" };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid, lang } = await params;
  const client = createClient();
  const finalUid = lang === "en" ? uid : `${uid}-pt-br`;
  const prismicLang = lang === "en" ? "en-us" : "pt-br";
  const page = await client
    .getByUID("case_study", finalUid, { lang: prismicLang })
    .catch(() => notFound());

  return (
    <Bounded as="article">
      <BackgroundVideo height="h-1/3" opacity="opacity-30" />

      {/* Page Content */}
      <div className="relative mt-24 grid place-items-center text-center md:mt-36">
        <h1 className="relative z-10 text-6xl font-medium text-tertiary">
          <PrismicText field={page.data.company} />
        </h1>
        <p className="relative z-10 mb-4 mt-8 max-w-xl text-lg text-tertiary">
          <PrismicText field={page.data.description} />
        </p>
        <PrismicNextImage
          field={page.data.logo}
          className="rounded-lg"
          quality={100}
        />
      </div>
      <div className="mx-auto -mt-20">
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
    .getByUID("case_study", finalUid, { lang: prismicLang })
    .catch(() => notFound());

  return {
    title: `${page.data.meta_title || asText(page.data.company) + " Case Study"}`,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  return [
    { uid: "case-study", lang: "en" as const },
    { uid: "case-study", lang: "pt-br" as const },
  ];
}
