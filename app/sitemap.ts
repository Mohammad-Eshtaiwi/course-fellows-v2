import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  // You can extend this to include dynamic course pages
  // by fetching your courses from the database
  // Example:
  // const courses = await prisma.course.findMany();
  // const courseUrls = courses.map(course => ({
  //   url: `${baseUrl}/courses/${course.id}`,
  //   lastModified: course.updatedAt,
  //   changeFrequency: "weekly" as const,
  //   priority: 0.7,
  // }));
  //
  // return [...routes, ...courseUrls];

  return routes;
}

