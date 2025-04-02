import { DM_Sans } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from "@/prismicio";
import "../globals.css"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: "en" | "pt-br" }>;
}) {
  const { lang } = await params;
  const client = createClient();
  const settings = await client.getSingle("settings", { lang: lang === "en" ? "en-us" : "pt-br" });

  return (
    <html lang={lang} className={dmSans.variable}>
      <body className="bg-background text-white">
        <Header settings={settings} lang={lang} />
        <main>{children}</main>
        <Footer settings={settings} lang={lang} />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "pt-br" },
  ];
}