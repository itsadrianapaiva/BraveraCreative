import * as prismic from '@prismicio/client';

export const prismicClient = prismic.createClient(
  process.env.PRISMIC_REPOSITORY_NAME!,
  {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  }
);