import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { SettingsDocument } from "../../prismicio-types";
import { createClient } from "@/prismicio";
import { asLink } from "@prismicio/client";
import LanguageToggle from "./LanguageToggle";

type FooterProps = {
  settings: SettingsDocument<string>;
  lang: "en" | "pt-br";
};

export default async function Footer({ settings, lang }: FooterProps) {
  const client = createClient();
  const caseStudies = await client.getAllByType("case_study", {
    limit: 5,
    lang: lang === "en" ? "en-us" : "pt-br",
  });
  const currentYear = new Date().getFullYear();

  // Language-specific text
  const text = {
    en: {
      menu: "Menu",
      caseStudies: "Case Studies",
      contactUs: "Contact Us",
      hours: "Mon – Fri 9AM – 5PM",
      bookMeeting: "Book a Meeting",
      copyright: `© ${currentYear} Bravera Creative. All rights reserved.`,
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      sitemap: "Sitemap",
    },
    "pt-br": {
      menu: "Menu",
      caseStudies: "Cases",
      contactUs: "Fale Conosco",
      hours: "Segunda – Sexta 9h – 17h",
      bookMeeting: "Agendar uma Reunião",
      copyright: `© ${currentYear} Bravera Creative. Todos os direitos reservados.`,
      privacyPolicy: "Política de Privacidade",
      termsOfService: "Termos de Serviço",
      sitemap: "Mapa do Site",
    },
  };

  return (
    <footer className="border-t border-slate-100/20 px-8 py-7 text-tertiary">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="col-span-2 mb-4 flex justify-center lg:items-center lg:justify-start">
            <Link href={`/${lang}`} aria-label="Bravera Creative Home Page">
              <PrismicNextImage
                field={settings.data.logo}
                className="w-78 md:w-96"
              />
            </Link>
          </div>
          <div className="mb-8 text-left font-light">
            <h3 className="mb-3 text-base font-medium uppercase">
              {text[lang].menu}
            </h3>
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-col gap-1">
                {settings.data.navigation.map((item) => {
                  const href = asLink(item.link) || `/${lang}`;
                  return (
                    <li key={item.label}>
                      <Link
                        href={href}
                        className="inline-flex min-h-8 items-center hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="mb-8 text-left font-light">
            <h3 className="mb-3 text-base font-medium uppercase">
              {text[lang].caseStudies}
            </h3>
            <ul className="flex flex-col gap-3">
              {caseStudies.map((caseStudy) => (
                <li key={caseStudy.uid}>
                  <Link
                    href={`/${lang}/case-study/${caseStudy.uid}`}
                    className="hover:text-primary"
                  >
                    <PrismicText field={caseStudy.data.company} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8 text-left font-light">
            <h3 className="mb-3 text-base font-medium uppercase">
              {text[lang].contactUs}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+14374484877" className="hover:text-primary">
                  +1 (437) 448-4877
                </a>
              </li>
              <li>
                <a href="tel:+55313989372580" className="hover:text-primary">
                  +55 (31) 98937-2580
                </a>
              </li>
              <li>
                <a
                  href="mailto:braveracreative@gmail.com"
                  className="hover:text-primary"
                >
                  braveracreative@gmail.com
                </a>
              </li>
              <li>
                <span>{text[lang].hours}</span>
              </li>
              <li>
                <a
                  href="https://calendly.com/braveracreative/meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {text[lang].bookMeeting}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse items-start gap-4 border-t border-slate-100/20 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-white/30">{text[lang].copyright}</p>
          <div className="flex flex-row items-start justify-evenly gap-4 md:items-center md:gap-4">
            <Link
              href={`/${lang}/legal/privacy`}
              className="text-white/30 hover:text-primary"
            >
              {text[lang].privacyPolicy}
            </Link>
            <Link
              href={`/${lang}/legal/terms`}
              className="text-white/30 hover:text-primary"
            >
              {text[lang].termsOfService}
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-white/30 hover:text-primary"
            >
              {text[lang].sitemap}
            </Link>
          </div>
          <div className="flex justify-start gap-4 md:justify-end">
            <Link
              href={
                lang === "en"
                  ? "https://www.instagram.com/braveracreative"
                  : "https://www.instagram.com/braveracreativebr"
              }
              aria-label="Instagram"
              target="_blank"
            >
              <FaInstagram className="h-6 w-6 text-white/30 hover:text-primary" />
            </Link>
            <Link
              href="https://www.facebook.com/braveracreative"
              aria-label="Facebook"
              target="_blank"
            >
              <FaFacebookF className="h-6 w-6 text-white/30 hover:text-primary" />
            </Link>
            <Link
              href="https://www.linkedin.com/braveracreative"
              aria-label="LinkedIn"
              target="_blank"
            >
              <FaLinkedinIn className="h-6 w-6 text-white/30 hover:text-primary" />
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
