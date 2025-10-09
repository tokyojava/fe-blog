import { z } from 'zod';

export const constraints = {
    title: {
        minLength: 3,
        maxLength: 100,
    },
    content: {
        minLength: 10,
        maxLength: 10000,
    },
};

export const CreateBlogZodSchema = z.object({
    title: z.string()
        .min(constraints.title.minLength, `Title must be at least ${constraints.title.minLength} characters long`)
        .max(constraints.title.maxLength, `Title must be at most ${constraints.title.maxLength} characters long`),
    content: z.string()
        .min(constraints.content.minLength, `Content must be at least ${constraints.content.minLength} characters long`)
        .max(constraints.content.maxLength, `Content must be at most ${constraints.content.maxLength} characters long`),
    tags: z.array(z.string()).optional(),
    summary: z.string().optional(),
    category: z.string({
        message: "Category is required"
    }),
    type: z.enum(['blog', 'diary'], "Type must be either 'Blog' or 'Diary'"),
});

export type CreateBlogRequest = z.infer<typeof CreateBlogZodSchema>;