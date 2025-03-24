import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import StarBackground from "./StarBackground";
import Image from "next/image";
import background from "./background.png";
import braveralogo from "./braveralogo.png";
import React from "react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for Integrations.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations: FC<IntegrationsProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <Image
        src={background}
        alt="background"
        fill
        className="object-cover"
        quality={90}
      />
      <StarBackground />

      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-5xl font-medium md:text-6xl">
          <PrismicText field={slice.primary.heading} />
        </h2>

        <div className="mx-auto mt-6 max-w-md text-balance text-center text-tertiary">
          <PrismicRichText field={slice.primary.body} />
        </div>

        {/* Logos */}
        <div className="relative mt-20 flex flex-wrap items-center justify-evenly gap-10 md:flex-nowrap">
          {/* Horizontal Line for MD+ screens */}
          <div className="absolute left-[calc(20%-190px)] right-[55%] top-1/2 z-0 hidden h-0.5 bg-gradient-to-r from-transparent via-gray-200/60 to-transparent md:block" />
          <div className="absolute left-[55%] right-[calc(20%-190px)] top-1/2 z-0 hidden h-0.5 bg-gradient-to-r from-transparent via-gray-200/60 to-transparent md:block" />

          {/* Vertical Lines for SM screens */}
          <div className="absolute -top-10 bottom-[70%] left-1/2 z-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-gray-200/60 to-transparent md:hidden" />
          <div className="absolute -bottom-2 left-1/2 top-[60%] z-0 w-0.5 -translate-x-1/2 bg-gradient-to-t from-transparent via-gray-200/60 to-transparent md:hidden" />

          {/* First two logos */}
          {slice.primary.items.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className="relative z-10 flex items-center justify-center"
            >
              <div className="absolute z-0 h-32 w-32 animate-pulse rounded-full border-2 border-gray-400 bg-gray-200/60 shadow-2xl"></div>
              <PrismicNextImage
                field={item.logo}
                className="relative z-10 h-auto w-28 mix-blend-multiply"
              />
            </div>
          ))}

          {/* Center Bravera Logo */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="absolute z-0 h-[188px] w-[183px] animate-pulse rounded-full border-2 border-gray-400 bg-gray-200/60 shadow-2xl"></div>
            <Image
              src={braveralogo}
              alt="Bravera Logo"
              width={380}
              height={380}
              className="relative z-10"
            />
          </div>

          {/* Last two logos */}
          {slice.primary.items.slice(2, 4).map((item, index) => (
            <div
              key={index + 2}
              className="relative z-10 flex items-center justify-center"
            >
              <div className="absolute z-0 h-32 w-32 animate-pulse rounded-full border-2 border-gray-400 bg-gray-200/60 shadow-2xl"></div>
              <PrismicNextImage
                field={item.logo}
                className="relative z-10 h-auto w-28 mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Integrations;
