import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import ButtonLink from "@/components/ButtonLink";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex min-h-screen items-center justify-center !p-0"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          {/*  Multiple Video Formats for Compatibility */}
          <source
            src="/video/backgroundhero.mp4"
            type="video/mp4; codecs=hvc1"
          />
          <source
            src="/video/backgroundhero.mp4"
            type="video/mp4; codecs=avc1"
          />
          <source src="/video/backgroundhero.webm" type="video/webm" />
          <source src="/video/backgroundhero.ogv" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
      <PrismicNextImage
        field={slice.primary.logo}
        className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2"
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center text-white">
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="text-5xl font-medium md:text-7xl">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        <PrismicRichText field={slice.primary.body} />
        <ButtonLink field={slice.primary.button}>
          {slice.primary.button_label}
        </ButtonLink>
      </div>
    </Bounded>
  );
};

export default Hero;
