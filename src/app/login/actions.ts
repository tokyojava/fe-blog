"use server";
import { connectToDatabase } from "@/db/driver";
import { serverError } from "@/lib/server_utils";
import { EmailLoginUserRequest, EmailLoginUserZodSchema } from "@/types/user";
import bcrypt from "bcrypt";
import User from "@/model/users";
import { cookies } from 'next/headers';
import { TOKEN_VALIDATION_INTERVAL } from "@/const";
import { signToken } from "@/lib/token";
import { API_ERRORS, APIException, handleApi } from "@/lib/api";
export type LoginActionServerSideState = {
    apiError?: string;
}

export async function LoginAction(req: EmailLoginUserRequest) {
    return handleApi({
        handler: async () => {
            const result = await EmailLoginUserZodSchema.safeParseAsync(req);

            if (result.success) {
                await connectToDatabase();

                // Find user by email
                const user = await User.findOne({ email: result.data.email });
                if (!user) {
                    throw new APIException(API_ERRORS.EMAIL_PASSWORD_INCORRECT);
                }

                // Verify password
                const isPasswordValid = await bcrypt.compare(result.data.password, user.password);
                if (!isPasswordValid) {
                    throw new APIException(API_ERRORS.EMAIL_PASSWORD_INCORRECT);
                }

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

            } else {
                serverError(result.error);
                throw new APIException(API_ERRORS.SERVER_SIDE_VALIDATION_ERROR);
            }
        },
        isServerAction: true,
        skipUserValidation: true,
    });
}