/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@prismicio/client');

const siteUrl = "https://braveracreative.netlify.app";
const generateRobotsTxt = true;

async function additionalPaths() {
  const client = createClient();

  // Fetch content from Prismic for each type
  const pages = await client.getAllByType("page");
  const caseStudies = await client.getAllByType("case_study");
  const legalPages = await client.getAllByType("legal_page");

  // Map pages: if uid is 'home', route is '/', otherwise '/:uid'
  const pageUrls = pages.map((page) => ({
    loc: page.uid === "home"
      ? "https://braveracreative.netlify.app/"
      : `https://braveracreative.netlify.app/${page.uid}`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
  }));

  // Map case studies: route is '/case-study/:uid'
  const caseStudyUrls = caseStudies.map((caseStudy) => ({
    loc: `https://braveracreative.netlify.app/case-study/${caseStudy.uid}`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
  }));

  // Map legal pages: route is '/legal/:uid'
  const legalPageUrls = legalPages.map((legalPage) => ({
    loc: `https://braveracreative.netlify.app/legal/${legalPage.uid}`,
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