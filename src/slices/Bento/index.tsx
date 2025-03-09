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
            <em className="bg-gradient-t-b from-">{children}</em>
          ),
        }}
      />
      <PrismicRichText field={slice.primary.body} />

      {slice.primary.items.map((item) => (
        <div className="glass-container" key={asText(item.title)}>
          <PrismicRichText field={item.title} />
          <PrismicRichText field={item.body} />
          <PrismicNextImage field={item.image} />
        </div>
      ))}
    </Bounded>
  );
};

export default Bento;
