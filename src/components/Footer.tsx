import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next"; // For images
import { PrismicNextLink } from "@prismicio/next"; // For links
import { PrismicText } from "@prismicio/react"; // Correct import for PrismicText
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  // Fetch 3 case studies from Prismic
  const caseStudies = await client.getAllByType("case_study", { limit: 5 });
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100/20 px-8 py-7 text-tertiary">
      <div className="mx-auto max-w-6xl">
        {/* Main Grid: 4 columns on lg screens */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Column 1: Logo */}
          <div className="col-span-2 mb-4 flex justify-center lg:items-center lg:justify-start">
            <Link href="/" aria-label="Bravera Creative Home Page">
              <PrismicNextImage
                field={settings.data.logo}
                className="w-78 md:w-96"
              />
            </Link>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="mb-8 text-left font-light">
            <h3 className="mb-3 text-base font-medium uppercase">Menu</h3>
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-col gap-1">
                {settings.data.navigation.map((item) => (
                  <li key={item.label}>
                    <PrismicNextLink
                      field={item.link}
                      className="inline-flex min-h-8 items-center hover:text-primary"
                    >
                      {item.label}
                    </PrismicNextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Case Study Links */}
          <div className="mb-8 text-left font-light">
            <h3 className="mb-3 text-base font-medium uppercase">
              Case Studies
            </h3>
            <ul className="flex flex-col gap-3">
              {caseStudies.map((caseStudy) => (
                <li key={caseStudy.uid}>
                  <Link
                    href={`/case-study/${caseStudy.uid}`}
                    className="hover:text-primary"
                  >
                    <PrismicText field={caseStudy.data.company} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="mb-8 text-left font-light">
            <h3 className="mb-3 text-base font-medium uppercase">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+14374484877" className="hover:text-primary">
                  +1 (437) 448-4877
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
                <span>Mon – Fri 9AM – 5PM</span>
              </li>
              <li>
                <a
                  href="https://calendly.com/braveracreative/meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Book a Meeting
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Second Row: Copyright, Legal Links, and Socials */}
        <div className="mt-6 flex flex-col-reverse items-start gap-4 border-t border-slate-100/20 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-white/30">
            © {currentYear} Bravera Creative. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-row items-start justify-evenly gap-4 md:items-center md:gap-4">
            <Link
              href="/legal/privacy"
              className="text-white/30 hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="text-white/30 hover:text-primary"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-white/30 hover:text-primary"
            >
              Sitemap
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-start gap-4 md:justify-end">
            <Link
              href="https://www.instagram.com/braveracreative"
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
          </div>
        </div>
      </div>
    </footer>
  );
}
