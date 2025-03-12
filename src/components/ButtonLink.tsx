import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        // Base styles
        "text-tertiary relative inline-flex h-fit w-fit rounded-full border border-slate-100/20 bg-slate-100/10 outline-none ring-[#96ff00] transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-[#96ff00] after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-[#96ff00]/40 hover:text-[#96ff00] after:hover:bg-opacity-15 focus:ring-2",

        // Responsive padding
        "px-3 py-1.5 md:px-4 md:py-2", // Smaller padding on mobile, larger on desktop

        // Responsive font size (optional)
        "text-sm md:text-base", // Smaller text on mobile, larger on desktop

        className,
      )}
      {...restProps}
    />
  );
}
