"use client";

import { FC } from "react";
import { asText, Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ButtonLink from "@/components/ButtonLink";

/**
 * Props for `Pricing`.
 */
export type PricingProps = SliceComponentProps<Content.PricingSlice>;

/**
 * Component for "Pricing" Slices.
 */
const Pricing: FC<PricingProps> = ({ slice }) => {
  const pathname = usePathname();
  const isPricingPage = pathname?.includes("/pricing");

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${isPricingPage ? "-mt-44" : "mt-12"}`}
    >
      {/* Heading */}
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="mt-72 text-balance text-center text-5xl font-medium md:text-6xl">
              {children}
            </h2>
          ),
          em: ({ children }) => (
            <em className="bg-gradient-to-b from-primary to-accent bg-clip-text not-italic text-transparent">
              {children}
            </em>
          ),
        }}
      />

      {/* Body text */}
      <div className="mx-auto mt-6 max-w-md text-balance text-center text-tertiary">
        <PrismicRichText field={slice.primary.body} />
      </div>

      {/* Three cards side by side */}
      <div className="mx-auto mt-16 grid max-w-xl grid-rows-[auto_auto_auto] gap-8 px-8 md:max-w-6xl md:grid-cols-3 md:gap-10 md:px-2">
        {slice.primary.items.map((item) => (
          <div
            className={clsx(
              "row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-slate-200/50 to-black p-4 shadow",
              "md:col-span-1",
            )}
            key={asText(item.title)}
          >
            <div className="flex items-center gap-4">
              {/* Image */}
              <PrismicNextImage
                field={item.image}
                className="max-h-16 w-auto"
              />
              <div className="flex flex-col">
                {/* Title */}
                <h3 className="text-2xl">
                  <PrismicText field={item.title} />
                </h3>
                {/* Price - Below title */}
                <div className="-mt-1 text-sm font-bold text-accent">
                  <PrismicRichText field={item.price} />
                </div>
              </div>
            </div>
            {/* Body */}
            <div className="mt-4 max-w-xl text-tertiary">
              <PrismicRichText
                field={item.body}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mb-4">{children}</p>
                  ),
                  list: ({ children }) => (
                    <ul className="mb-4 list-disc pl-5">{children}</ul>
                  ),
                  listItem: ({ children }) => <li>{children}</li>,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-16 flex flex-col items-center px-6 text-center text-white">
        {isFilled.link(slice.primary.button_link) && (
          <ButtonLink field={slice.primary.button_link}>
            {slice.primary.button_label}
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

export default Pricing;
