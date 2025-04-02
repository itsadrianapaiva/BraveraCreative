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
        {/* Google Tag Manager - Script */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W3ML5XHK');
          `}
        </Script>
      </head>
      <body className="bg-background text-white">
        {/* Google Tag Manager - NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3ML5XHK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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
