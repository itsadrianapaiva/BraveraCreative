import { createClient } from "@/prismicio";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://your-website.com"; // Replace with your actual domain
  const client = createClient();
  const pages = await client.getAllByType("page");
  const legalPages = await client.getAllByType("legal_page");

  const urls = [
    `${baseUrl}/`, // Home page
    ...pages.map((page) => `${baseUrl}/${page.uid}`),
    ...legalPages.map((legal) => `${baseUrl}/legal/${legal.uid}`),
  ];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (url) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("\n")}
    </urlset>
  `.trim();

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
