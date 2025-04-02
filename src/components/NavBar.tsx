"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { asLink, LinkField, ImageField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import LanguageToggle from "@/components/LanguageToggle";

interface NavItem {
  label: string | null;
  link: LinkField;
  cta_button: boolean;
}

interface NavBarProps {
  settings: {
    data: {
      logo: ImageField;
      navigation: NavItem[];
    };
  };
  lang: "en" | "pt-br";
}

export default function NavBar({ settings, lang }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === `/${lang}`;

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage");
    const browserLang = navigator.language.startsWith("pt") ? "pt-br" : "en";
    const redirectLang =
      storedLang === "en" || storedLang === "pt-br" ? storedLang : browserLang;
    if (lang !== redirectLang) {
      router.replace(`/${redirectLang}`);
    }
  }, [lang, router]);

  return (
    <nav aria-label="Main" className="px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white lg:flex-row lg:items-center">
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="block p-2 text-3xl text-tertiary lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        <div className="pointer-events-none fixed inset-0 z-40 lg:hidden">
          {open && (
            <div
              className="pointer-events-auto absolute inset-0 bg-black bg-opacity-60"
              onClick={() => setOpen(false)}
            />
          )}
          <div
            className={clsx(
              "pointer-events-auto absolute bottom-0 right-0 top-0 z-50 flex w-[70%] flex-col items-start gap-4 bg-black pr-4 pt-40 transition-transform duration-700 ease-in-out motion-reduce:transition-none",
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
                className="ml-2 mt-10 w-52"
              />
              <span className="sr-only">Bravera Creative Home Page</span>
            </Link>
            <button
              type="button"
              className="absolute right-4 top-6 p-2 text-3xl text-primary"
              aria-expanded={open}
              onClick={() => setOpen(false)}
            >
              <MdClose />
              <span className="sr-only">Close Menu</span>
            </button>

            <div className="ml-6 grid justify-items-start gap-8">
              {settings.data.navigation.map((item) => {
                if (item.cta_button) {
                  return (
                    <ButtonLink
                      key={item.label || "cta"}
                      field={item.link}
                      onClick={() => setOpen(false)}
                      aria-current={
                        pathname.includes(asLink(item.link) as string)
                          ? "page"
                          : undefined
                      }
                      className="ml-2 mt-2 rounded-lg p-12 text-base font-medium uppercase text-tertiary md:text-lg"
                    >
                      {item.label || "CTA"}
                    </ButtonLink>
                  );
                }
                return (
                  <PrismicNextLink
                    key={item.label || "link"}
                    className="block px-3 text-base font-light uppercase text-tertiary hover:text-primary md:text-lg"
                    field={item.link}
                    onClick={() => setOpen(false)}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label || "Link"}
                  </PrismicNextLink>
                );
              })}
            </div>

            <div className="ml-8 mt-4 flex justify-center gap-4">
              <Link
                href="https://www.instagram.com/braveracreative"
                aria-label="Instagram"
                target="_blank"
              >
                <FaInstagram className="h-6 w-6 text-tertiary hover:text-primary" />
              </Link>
              <Link
                href="https://www.facebook.com/braveracreative"
                aria-label="Facebook"
                target="_blank"
              >
                <FaFacebookF className="h-6 w-6 text-tertiary hover:text-primary" />
              </Link>
              <Link
                href="https://www.linkedin.com/braveracreative"
                aria-label="LinkedIn"
                target="_blank"
              >
                <FaLinkedinIn className="h-6 w-6 text-tertiary hover:text-primary" />
              </Link>
              <LanguageToggle />
            </div>
          </div>
        </div>

        {isHomePage && (
          <div className="absolute left-4 top-4">
            <LanguageToggle />
          </div>
        )}
        {!isHomePage && !open && (
          <>
            <Link
              href={`/${lang}`}
              className="left-15 absolute top-4"
              onClick={() => setOpen(false)}
            >
              <PrismicNextImage
                field={settings.data.logo}
                className="w-48 md:w-64"
              />
            </Link>
            <div className="hidden items-center justify-between lg:flex">
              <ul className="flex gap-6">
                {settings.data.navigation.map((item) => {
                  const href = asLink(item.link) || `/${lang}`;
                  return (
                    <li key={item.label || "nav"}>
                      {item.cta_button ? (
                        <ButtonLink
                          href={href}
                          aria-current={
                            pathname.includes(href) ? "page" : undefined
                          }
                        >
                          {item.label || "CTA"}
                        </ButtonLink>
                      ) : (
                        <Link
                          href={href}
                          className="inline-flex min-h-11 items-center"
                          aria-current={
                            pathname.includes(href) ? "page" : undefined
                          }
                        >
                          {item.label || "Link"}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
