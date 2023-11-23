import {z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const examCollection = defineCollection({
    type: 'data',
    schema: z.array(
        z.object({
          question: z.string(),
          options: z.array(z.string()),
          answer: z.string(),
        })
    ),
  });
  
  // 3. Export a single `collections` object to register your collection(s)
  export const collections = {
    'exams': examCollection,
  };
  