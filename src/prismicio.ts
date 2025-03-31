import {
  createClient as baseCreateClient,
  ClientConfig,
  Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../slicemachine.config.json";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

const routes: Route[] = [
  { type: "page", uid: "home", path: "/en", lang: "en-us" },
  { type: "page", uid: "home", path: "/pt-br", lang: "pt-br" },
  { type: "page", path: "/en/:uid", lang: "en-us" },
  { type: "page", path: "/pt-br/:uid", lang: "pt-br" },
  { type: "case_study", path: "/en/case-study/:uid", lang: "en-us" },
  { type: "case_study", path: "/pt-br/case-study/:uid", lang: "pt-br" },
  { type: "legal_page", path: "/en/legal/:uid", lang: "en-us" },
  { type: "legal_page", path: "/pt-br/legal/:uid", lang: "pt-br" },
];

export function createClient(config: ClientConfig = {}) {
  const client = baseCreateClient(sm.apiEndpoint || repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}
