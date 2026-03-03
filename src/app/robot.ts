import { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/static/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
