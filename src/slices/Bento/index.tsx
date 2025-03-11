import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";

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
            <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
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
            className="glass-container to gray-950 row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 p-4"
            key={asText(item.title)}
          >
            <PrismicRichText field={item.title} />
            <PrismicRichText field={item.body} />
            <PrismicNextImage field={item.image} />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Bento;
