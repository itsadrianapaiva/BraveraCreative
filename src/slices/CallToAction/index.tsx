import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import bgbravera from "./bgbravera.png";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden px-6 py-32 text-center font-medium md:py-40"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-[#96ff00]/50 blur-[160px] filter" />

      <div className="glass-container rounded-lg bg-gradient-to-l from-slate-500/10 to-black p-4 md:rounded-xl">
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgbravera}
            alt="Bravera Background"
            fill
            className="rounded-lg object-cover object-right md:object-cover"
          />
        </div>

        <div className="space-y-4 p-8 text-left">
          <div className="max-w-2xl text-balance text-left text-5xl font-medium md:text-6xl">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          <div className="prose prose-invert mt-4 max-w-md text-balance">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <ButtonLink field={slice.primary.button_link} className="mb-8 mt-6">
            {slice.primary.button_label}
          </ButtonLink>
        </div>
      </div>
    </Bounded>
  );
};

export default CallToAction;
