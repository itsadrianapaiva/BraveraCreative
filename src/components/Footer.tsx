import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100/20 px-8 py-7">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:items-center md:gap-8">
        {/* Logo: Centered on mobile, left-aligned on md+ */}
        <div className="flex justify-center md:justify-start">
          <Link href="/" aria-label="Bravera Creative Home Page">
            <PrismicNextImage field={settings.data.logo} />
          </Link>
        </div>

        {/* Navigation Links: Full width on mobile, centered on md+ */}
        <nav aria-label="Footer" className="flex justify-center md:col-span-3">
          <ul className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
            {settings.data.navigation.map((item) => (
              <li key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center hover:text-primary"
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Media Links: Centered on mobile, right-aligned on md+ */}
        <div className="flex justify-center gap-4 md:justify-end">
          <Link
            href="https://www.instagram.com/braveracreative"
            aria-label="Instagram"
            target="_blank"
          >
            <FaInstagram className="h-6 w-6 hover:text-primary" />
          </Link>
          <Link
            href="https://www.facebook.com/braveracreative"
            aria-label="Facebook"
            target="_blank"
          >
            <FaFacebookF className="h-6 w-6 hover:text-primary" />
          </Link>
          <Link
            href="https://www.linkedin.com/braveracreative"
            aria-label="LinkedIn"
            target="_blank"
          >
            <FaLinkedinIn className="h-6 w-6 hover:text-primary" />
          </Link>
        </div>

        {/* Legal Links and Copyright: Full width below content */}
        <div className="mt-4 flex flex-col items-center gap-2 text-sm md:col-span-5">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <Link href="/legal/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/legal/sitemap" className="hover:text-primary">
              Sitemap
            </Link>
          </div>
          <p className="text-white/30">
            © {currentYear} Bravera Creative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
