"use server";
import { connectToDatabase } from "@/db/driver";
import { serverError } from "@/lib/server_utils";
import { fromFormData } from "@/lib/utils";
import { LoginUserZodSchema } from "@/types/user";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import User from "@/model/users";
import { cookies } from 'next/headers';
import { TOKEN_VALIDATION_INTERVAL } from "@/const";
import { signToken } from "@/lib/token";
export type LoginActionServerSideState = {
    apiError?: string;
}

export async function LoginAction(prevState: LoginActionServerSideState, formData: FormData): Promise<LoginActionServerSideState> {
    const obj = fromFormData(formData);
    const result = await LoginUserZodSchema.safeParseAsync(obj);

    if (result.success) {
        try {
            await connectToDatabase();

            // Find user by email
            const user = await User.findOne({ email: result.data.email });
            if (!user) {
                return {
                    apiError: "Email or Password is incorrect"
                };
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(result.data.password, user.password);
            if (!isPasswordValid) {
                return { apiError: "Email or Password is incorrect" };
            }

            console.log("Login successful");

            const cookieStore = await cookies();

            const userInfo = {
                id: user._id.toString(),
                email: user.email,
                name: user.username,
            }
            const tokenValue = await signToken(userInfo);

            cookieStore.set('token', tokenValue, {
                httpOnly: true, // Recommended for security
                // secure: process.env.NODE_ENV === 'production', // Use secure in production
                maxAge: 60 * 60 * 24 * TOKEN_VALIDATION_INTERVAL - 600, // 7 days in seconds minus some buffer
                path: '/',
            });
        } catch (e: unknown) {
            serverError(e);
            return { apiError: "Internal server error" };
        }
        redirect('/dashboard'); // Redirect to home page after login
    } else {
        serverError(result.error);
        return {
            apiError: "Unknown reason, should not happen"
        };
    }
}