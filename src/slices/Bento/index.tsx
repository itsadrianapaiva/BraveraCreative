import { FC } from "react";
import { asText, Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";

/**
 * Props for `Bento`.
 */
export type BentoProps = SliceComponentProps<Content.BentoSlice>;

/**
 * Component for "Bento" Slices.
 */
const Bento: FC<BentoProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-balance text-center text-5xl font-medium md:text-6xl">
              {children}
            </h2>
          ),
          em: ({ children }) => (
            <em className="from-primary to-accent bg-gradient-to-b bg-clip-text not-italic text-transparent">
              {children}
            </em>
          ),
        }}
      />
      <div className="text-tertiary mx-auto mt-6 max-w-md text-balance text-center">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        {slice.primary.items.map((item) => (
          <div
            className={clsx(
              "glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-slate-500/10 to-black p-4",
              item.wide ? "md:col-span-2" : "md:col-span-1",
            )}
            key={asText(item.title)}
          >
            <h3 className="text-2xl">
              <PrismicText field={item.title} />
            </h3>
            <div className="text-tertiary max-w-md text-balance">
              <PrismicRichText field={item.body} />
            </div>
            <PrismicNextImage field={item.image} className="max-h-36 w-auto" />
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center px-6 text-center text-white">
        {isFilled.link(slice.primary.button) && (
          <ButtonLink field={slice.primary.button} className="">
            {slice.primary.button_label}
          </ButtonLink>
        )}
      </div>
    </Bounded>
  );
};

export default Bento;
