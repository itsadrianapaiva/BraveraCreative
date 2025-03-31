"use client";

import NavBar from "@/components/NavBar";
import { Content } from "@prismicio/client";

type HeaderProps = {
  settings: Content.SettingsDocument;
  lang: "en" | "pt-br"; // Add lang
};

export default function Header({ settings, lang }: HeaderProps) {
  return (
    <header className="absolute left-0 top-3 z-[9999] w-full bg-transparent">
      <NavBar settings={settings} lang={lang} /> {/* Pass lang to NavBar */}
    </header>
  );
}