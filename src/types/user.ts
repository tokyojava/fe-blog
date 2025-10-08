import { z } from "zod";

export enum AuthType {
    GITHUB = 'github',
    GOOGLE = 'google',
    EMAIL = 'email',
}

// 提取限制属性到共享配置对象
export const constraints = {
    username: {
        minLength: 3,
        maxLength: 20,
    },
    password: {
        minLength: 8,
    },
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// 使用共享配置定义 zod schema
const userZodSchema = z.object({
    username: z.string()
        .min(constraints.username.minLength, {
            message: `Username must be at least ${constraints.username.minLength} characters long`,
        }).max(constraints.username.maxLength, {
            message: `Username must be at most ${constraints.username.maxLength} characters long`,
        }),
    email: z.email({ pattern: constraints.emailPattern, message: "Invalid email address" }),
    password: z.string().min(constraints.password.minLength, { message: `Password must be at least ${constraints.password.minLength} characters long` }),
    auth_type: z.enum([AuthType.GITHUB, AuthType.GOOGLE, AuthType.EMAIL]),
    third_party_id: z.string().optional(),
});

export const CreateEmailUserZodSchema = userZodSchema.omit({ third_party_id: true, auth_type: true });
export const CreateThirdPartyUserZodSchema = userZodSchema.omit({ email: true, password: true, auth_type: true });

export const LoginUserZodSchema = z.object({
    email: z.email({
        message: "Invalid email address",
        pattern: constraints.emailPattern,
    }),
    password: z.string().min(1, { message: "Password is required" }),
});

export type User = z.infer<typeof userZodSchema>;
export type CreateEmailUserRequest = z.infer<typeof CreateEmailUserZodSchema>;
export type CreateThirdPartyUserRequest = z.infer<typeof CreateThirdPartyUserZodSchema>;