import { type FC } from "react";
import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import BackgroundVideo from "@/components/BackgroundVideo";

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
  },
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText: FC<RichTextProps> = ({ slice }) => {
  return (
    <Bounded className="">
      <BackgroundVideo height="h-2/5" opacity="opacity-30" />

      {/* Page Content */}
      <div className="relative grid place-items-center pt-24 text-center lg:pt-32">
        <div className="relative z-10 text-6xl font-medium text-tertiary">
          <PrismicRichText field={slice.primary.heading} />
          <p className="pt-2 text-lg text-accent">{slice.primary.subtitle}</p>
        </div>
        <div className="relative z-10 mb-8 mt-8 max-w-xl text-lg text-tertiary">
          <PrismicRichText field={slice.primary.description} />
        </div>
        {isFilled.image(slice.primary.image) && (
          <PrismicNextImage
            field={slice.primary.image}
            quality={100}
            className="rounded-lg"
          />
        )}
      </div>

      <div className="prose prose-lg prose-slate prose-invert mt-8">
        <PrismicRichText
          field={slice.primary.content}
          components={components}
        />
      </div>

      <div className="mt-16 flex flex-col items-center px-6 text-center text-white">
        {isFilled.link(slice.primary.button_link) && (
          <ButtonLink field={slice.primary.button_link}>
            {slice.primary.button_label}
          </ButtonLink>
        )}
      </div>
    </Bounded>
  );
};

export default RichText;
