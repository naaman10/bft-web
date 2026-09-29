import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { LOCATION_SLUGS } from "@/lib/locations";
import { getSiteUrl } from "@/lib/site";
import { TUTORING_SLUGS } from "@/lib/tutoring";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const tutoringRoutes: MetadataRoute.Sitemap = TUTORING_SLUGS.map((slug) => ({
    url: `${base}/tutoring/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const locationRoutes: MetadataRoute.Sitemap = LOCATION_SLUGS.map((slug) => ({
    url: `${base}/location/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const routes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/services/one-to-one`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/services/group`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/services/home-ed`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...tutoringRoutes,
    ...locationRoutes,
    {
      url: `${base}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const articles = await getArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => !article.noIndex)
    .map((article) => ({
      url: `${base}/resources/${article.slug}`,
      lastModified: new Date(article.updatedDate ?? article.publishedDate),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...routes, ...articleRoutes];
}
