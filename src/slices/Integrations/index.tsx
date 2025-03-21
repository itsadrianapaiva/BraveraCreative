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
        alt=""
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
        <div className="relative mt-20 flex flex-wrap items-center justify-center gap-10 md:flex-nowrap">
          {/* Left Line */}
          <div className="absolute left-[calc(25%-30px)] right-1/2 top-1/2 z-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />

          {/* Right Line */}
          <div className="absolute left-1/2 right-[calc(25%-30px)] top-1/2 z-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />

          {/* First two logos with more solid pulsing icons */}
          {slice.primary.items.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className="relative z-10 flex items-center justify-center"
            >
              {/* More solid Pulsing Square Behind */}
              <div className="absolute z-0 h-36 w-36 animate-pulse rounded-lg border-2 border-gray-400 bg-gray-200/60 shadow-2xl"></div>
              <PrismicNextImage
                field={item.logo}
                className="relative z-10 h-auto w-32"
              />
            </div>
          ))}

          {/* Circle Border + Bravera Logo */}
          <div className="relative z-10 mx-6 flex items-center justify-center">
            {/* Full Pulsing Circle Behind */}
            <div className="absolute z-0 h-[188px] w-[183px] animate-pulse rounded-full border-2 border-gray-400 bg-gray-200/60 shadow-2xl"></div>
            <Image
              src={braveralogo}
              alt="Bravera Logo"
              width={380}
              height={380}
              className="relative z-10"
            />
          </div>

          {/* Last two logos with more solid pulsing icons */}
          {slice.primary.items.slice(2, 4).map((item, index) => (
            <div
              key={index + 2}
              className="relative z-10 flex items-center justify-center"
            >
              {/* More solid Pulsing Square Behind */}
              <div className="absolute z-0 h-36 w-36 animate-pulse rounded-lg border-2 border-gray-400 bg-gray-200/60 shadow-2xl"></div>
              <PrismicNextImage
                field={item.logo}
                className="relative z-10 h-auto w-32"
              />
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Integrations;
