import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import clsx from "clsx";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-[#96ff00]/15 blur-3xl filter" />

      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-balance text-center text-5xl font-medium md:text-6xl">
              {children}
            </h2>
          ),
        }}
      />

      <div className="mt-16 grid items-center gap-8 rounded-xl border border-slate-100/20 bg-gradient-to-b from-slate-500/10 to-black px-8 py-8 backdrop-blur-sm md:grid-cols-2 lg:grid-cols-3 lg:py-12">
        <div className="">
          <div className="mt-6 text-2xl font-normal">
            <PrismicRichText field={slice.primary.subheading} />
          </div>

          <div className="prose prose-invert mt-4 max-w-xl">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <div className="text-center lg:text-left">
            <ButtonLink field={slice.primary.button} className="mt-6">
              {slice.primary.button_label || "Learn More"}
            </ButtonLink>
          </div>
        </div>

        <PrismicNextImage
          field={slice.primary.image}
          className={clsx(
            "rounded-lg opacity-90 shadow-2xl lg:col-span-2 lg:pt-0",
            slice.variation === "reverse"
              ? "lg:order-1 lg:translate-x-[15%]"
              : "lg:-order-1 lg:translate-x-[-15%]",
          )}
        />
      </div>
    </Bounded>
  );
};

export default About;
