import Link from "next/link";
import { asLink, LinkField } from "@prismicio/client"; 
import clsx from "clsx";
import { ReactNode } from "react";

type ButtonLinkProps = {
  href?: string; 
  field?: LinkField; 
  className?: string;
  children: ReactNode;
  [key: string]: unknown; 
};

export default function ButtonLink({
  href,
  field,
  className,
  children,
  ...restProps
}: ButtonLinkProps) {
  const resolvedHref = href || asLink(field) || "/"; 

  return (
    <Link
      href={resolvedHref}
      className={clsx(
        "text-tertiary relative inline-flex h-fit w-fit rounded-full border border-slate-100/20 bg-slate-100/10 outline-none ring-[#96ff00] transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-[#96ff00] after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-[#96ff00]/40 hover:text-[#96ff00] after:hover:bg-opacity-15 focus:ring-2",
        "px-3 py-1.5 md:px-4 md:py-2",
        "text-sm md:text-base",
        className,
      )}
      {...restProps}
    >
      {children}
    </Link>
  );
}