import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import Bounded from "@/components/Bounded";
import BackgroundVideo from "@/components/BackgroundVideo";

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
      {/* Reusable Background Video */}
      <BackgroundVideo height="h-full" opacity="opacity-90" />

      <PrismicNextImage
        field={slice.primary.logo}
        className="absolute left-1/2 top-[15%] -translate-x-1/2 -translate-y-1/2 opacity-70"
      />

      {/* Content Layer */}
      <div className="top-3/5 absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 text-center text-white">
        {isFilled.image(slice.primary.business_name) && (
          <h1 className="text-5xl font-medium md:text-7xl">
            <PrismicNextImage field={slice.primary.business_name} />
          </h1>
        )}

        {isFilled.link(slice.primary.button) && (
          <ButtonLink field={slice.primary.button}>
            {/* Show shorter text on mobile, full text on desktop */}
            <span className="inline md:hidden">Get to Know</span>
            <span className="hidden md:inline">
              {slice.primary.button_label}
            </span>
          </ButtonLink>
        )}
      </div>

      {isFilled.image(slice.primary.arrow_down) && (
        <PrismicNextImage
          field={slice.primary.arrow_down}
          className="absolute bottom-5 left-1/2 h-16 w-16 -translate-x-1/2 opacity-20 md:h-24 md:w-24"
        />
      )}
    </Bounded>
  );
};

export default Hero;
