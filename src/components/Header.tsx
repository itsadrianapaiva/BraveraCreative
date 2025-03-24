"use client";

import NavBar from "@/components/NavBar";
import { Content } from "@prismicio/client";

type HeaderProps = {
  settings: Content.SettingsDocument;
};

export default function Header({ settings }: HeaderProps) {
  return (
    <header className="absolute left-0 top-0 z-[9999] w-full bg-transparent">
      <NavBar settings={settings} />
    </header>
  );
}
