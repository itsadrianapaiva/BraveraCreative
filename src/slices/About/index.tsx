import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { PrismicNextImage } from "@prismicio/next";

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
    >
      <PrismicRichText field={slice.primary.heading} />

      <PrismicNextImage field={slice.primary.image} />

      <PrismicRichText field={slice.primary.subheading} />

      <PrismicRichText field={slice.primary.body} />

      
      <ButtonLink field={slice.primary.button}>
        {slice.primary.button_label}
      </ButtonLink>
    </Bounded>
  );
};

export default About;
