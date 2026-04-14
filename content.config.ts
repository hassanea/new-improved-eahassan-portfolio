import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/seo";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        tags: z.optional(z.array(z.string())),
        author: z.string(),
        authorAvatar: z.string(),
        authorDescription: z.string(),
        thumbNail: z.string(),
        rawBody: z.string(),
      }),
    }),
  },
});
