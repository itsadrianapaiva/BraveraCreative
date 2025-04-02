/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require("@prismicio/client");

const siteUrl = "https://braveracreative.com";
const generateRobotsTxt = true;

async function additionalPaths() {
  const client = createClient();

  // Fetch content from Prismic for each type
  const pages = await client.getAllByType("page");
  const caseStudies = await client.getAllByType("case_study");
  const legalPages = await client.getAllByType("legal_page");

  // Helper function to construct the correct path
  const getLangPrefix = (lang) => (lang === "en-us" ? "/en" : "/pt-br");

  // Map pages: Adjust UID handling for Portuguese pages
  const pageUrls = pages.map((page) => {
    const langPrefix = getLangPrefix(page.lang);
    const uid =
      page.lang === "pt-br" ? page.uid.replace("-pt-br", "") : page.uid;
    return {
      loc:
        page.uid === "home" || page.uid === "home-pt-br"
          ? `${siteUrl}${langPrefix}`
          : `${siteUrl}${langPrefix}/${uid}`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.8,
    };
  });

  // Map case studies
  const caseStudyUrls = caseStudies.map((caseStudy) => ({
    loc: `${siteUrl}${getLangPrefix(caseStudy.lang)}/case-study/${caseStudy.uid}`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
  }));

  // Map legal pages
  const legalPageUrls = legalPages.map((legalPage) => ({
    loc: `${siteUrl}${getLangPrefix(legalPage.lang)}/legal/${legalPage.uid}`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
  }));

  // Return all generated sitemap entries
  return [...pageUrls, ...caseStudyUrls, ...legalPageUrls];
}

const config = {
  siteUrl,
  generateRobotsTxt,
  additionalPaths,
};

module.exports = config;
