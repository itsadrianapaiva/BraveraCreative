import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import BackgroundVideo from "@/components/BackgroundVideo";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("case_study", uid).catch(() => notFound());

  return (
    <Bounded as="article">
     <BackgroundVideo height="h-1/3" opacity="opacity-30" />

      {/* Page Content */}
      <div className="relative grid place-items-center text-center mt-20">
        <h1 className="relative z-10 text-6xl font-medium text-tertiary">
          <PrismicText field={page.data.company} />
          <p className="text-lg text-accent">Case Study</p>
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
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("case_study", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("case_study");

  return pages.map((page) => ({ uid: page.uid }));
}
