import { z } from 'zod';

// Zod validation schema for creating a blog
export const blogCreateSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' })
    .max(100, { message: 'Title must be at most 100 characters long' }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long' })
    .max(1000, { message: "Description can't be longer than 1000 characters" }),
  author: z.string().optional(), // You can keep author optional, or make it required based on your needs
  image: z
    .string()
    
   ,
  tags: z.array(z.string()).optional(), // If tags are provided, split into array
});

export type BlogCreateInput = z.infer<typeof blogCreateSchema>;
