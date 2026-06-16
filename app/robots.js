const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://meditime.rs";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/login", "/appointments/success"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
