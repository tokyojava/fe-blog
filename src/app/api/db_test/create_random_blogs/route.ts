import { handleApi } from '@/lib/api';
import { IBlog, insertManyBlogs } from '@/model/blogs';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    return handleApi({
        handler: async () => {
            const json = await req.json();
            const blogs: Partial<IBlog>[] = [];

            const types = ['blog', 'diary'] as const;
            const categories = ['javascript', 'Typescript', 'python', 'java'];

            for (let i = 1; i <= 50; i++) {
                const randomType = types[Math.floor(Math.random() * types.length)];
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];

                blogs.push({
                    title: `Blog Title ${i}`,
                    content: `This is the content of blog ${i}.`,
                    type: randomType,
                    category: [randomCategory],
                    author: json.userId,
                });
            }

            await insertManyBlogs(blogs);

            // Simulate saving to a database
            console.log('Generated Blogs:', blogs);

            return { message: '50 blogs created successfully', blogs };
        },
        skipUserValidation: true,
    })
}