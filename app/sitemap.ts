import type { MetadataRoute } from "next";
import { isSubjectsFeatureEnabled } from "@/lib/feature-flags";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const subjectRoutes: MetadataRoute.Sitemap = isSubjectsFeatureEnabled()
    ? [
        {
          url: `${base}/subjects/english`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.85,
        },
        {
          url: `${base}/subjects/maths`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.85,
        },
        {
          url: `${base}/subjects/11-plus-preparation`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.85,
        },
      ]
    : [];

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
    ...subjectRoutes,
  ];

  return routes;
}
