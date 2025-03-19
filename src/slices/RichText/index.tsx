import { type FC } from "react";
import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";

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
    <Bounded>
      <div className="prose prose-lg prose-slate prose-invert">
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
