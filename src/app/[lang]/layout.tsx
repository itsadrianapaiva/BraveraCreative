import { DM_Sans } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from "@/prismicio";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import Script from "next/script";

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
  const settings = await client.getSingle("settings", {
    lang: lang === "en" ? "en-us" : "pt-br",
  });

  return (
    <html lang={lang} className={dmSans.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JEJ61MH7WR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-JEJ61MH7WR');
    `}
        </Script>

        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="H6X1Yv-uCMCu9dE64L5hGlLoUBrxD7CX-XI3q8Y-_Z8"
        />
      </head>
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
  return [{ lang: "en" }, { lang: "pt-br" }];
}
