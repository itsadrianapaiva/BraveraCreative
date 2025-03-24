"use-client";

import { useState } from "react";
import Link from "next/link";
import { asLink, Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="md-:py-6 px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="block p-2 text-3xl text-tertiary md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[black] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <Link
            href="/"
            className="absolute left-4 top-4"
            onClick={() => setOpen(false)}
          >
            <PrismicNextImage
              field={settings.data.logo}
              className="md:300 w-48"
            />
            <span className="sr-only">Bravera Creative Home Page</span>
          </Link>
          <button
            type="button"
            className="fixed right-4 top-6 mb-4 block p-2 text-3xl text-primary md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close Menu</span>
          </button>

          <div className="grid justify-items-end gap-8">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <ButtonLink
                    key={item.label}
                    field={item.link}
                    onClick={() => setOpen(false)}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                );
              }
              return (
                <PrismicNextLink
                  key={item.label}
                  className="block px-3 text-2xl first:mt-12 md:text-3xl"
                  field={item.link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>

        {/* Desktop Nav - Only show on secondary pages when hamburger menu is closed */}
        {pathname !== "/" && !open && (
          <>
            <Link
              href="/"
              className="left-15 absolute top-4"
              onClick={() => setOpen(false)}
            >
              <PrismicNextImage field={settings.data.logo} className="w-48" />
            </Link>
            <div className="hidden items-center justify-between md:flex">
              <ul className="flex gap-6">
                {settings?.data?.navigation?.map((item) => (
                  <li key={item.label}>
                    {item.cta_button ? (
                      <ButtonLink
                        field={item.link}
                        aria-current={
                          pathname.includes(asLink(item.link) as string)
                            ? "page"
                            : undefined
                        }
                      >
                        {item.label}
                      </ButtonLink>
                    ) : (
                      <PrismicNextLink
                        field={item.link}
                        className="inline-flex min-h-11 items-center"
                        aria-current={
                          pathname.includes(asLink(item.link) as string)
                            ? "page"
                            : undefined
                        }
                      >
                        {item.label}
                      </PrismicNextLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
