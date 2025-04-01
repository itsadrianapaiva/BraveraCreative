"use client";

import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import * as prismic from "@prismicio/client";

export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

const CaseStudies: FC<CaseStudiesProps> = ({ slice }) => {
  const [caseStudies, setCaseStudies] = useState<Content.CaseStudyDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname(); // Get current URL path
  const lang = pathname?.startsWith("/pt-br") ? "pt-br" : "en"; // Determine lang from path

  useEffect(() => {
    const fetchCaseStudies = async () => {
      const client = createClient();
      try {
        const fetchedCaseStudies = await Promise.all(
          slice.primary.items
            .filter((item) => isFilled.contentRelationship(item.case_study))
            .map(async (item) => {
              const caseStudy = item.case_study as prismic.FilledContentRelationshipField<"case_study">;
              return await client.getByUID<Content.CaseStudyDocument>(
                "case_study",
                caseStudy.uid!,
                { lang: lang === "en" ? "en-us" : "pt-br" },
              );
            }),
        );
        setCaseStudies(fetchedCaseStudies.filter(Boolean));
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaseStudies();
  }, [slice.primary.items, lang]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-400"></div>
      </div>
    );
  }

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-6xl">
        <PrismicText field={slice.primary.heading} />
      </h2>
      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>
      <div className="my-auto mt-20 grid gap-16">
        {caseStudies.map((caseStudy, index) => (
          <div
            key={caseStudy.id}
            className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            <div className="col-span-1 flex flex-col justify-center gap-4">
              <h3 className="text-4xl">
                <PrismicText field={caseStudy.data.company} />
              </h3>
              <div className="max-w-md">
                <PrismicRichText field={caseStudy.data.description} />
              </div>
              <PrismicNextLink
                href={`/${lang}/case-study/${caseStudy.uid}`}
                className="after:absolute after:inset-0 hover:underline"
              >
                Read <PrismicText field={caseStudy.data.company} /> Case Study
              </PrismicNextLink>
            </div>
            <PrismicNextImage
              field={caseStudy.data.logo}
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={clsx("rounded-xl lg:col-span-2", index % 2 && "md:-order-1")}
            />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default CaseStudies;