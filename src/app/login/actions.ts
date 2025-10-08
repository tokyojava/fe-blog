"use server";
import { connectToDatabase } from "@/db/driver";
import { serverError } from "@/lib/server_utils";
import { fromFormData } from "@/lib/utils";
import { LoginUserZodSchema } from "@/types/user";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import User from "@/model/users";

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
                return { apiError: "Email or Password is incorrect" };
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(result.data.password, user.password);
            if (!isPasswordValid) {
                return { apiError: "Email or Password is incorrect" };
            }
        } catch (e: unknown) {
            serverError(e);
            return { apiError: "Internal server error" };
        }
        console.log("Login successful");
        // Redirect to dashboard or home page after successful login
        redirect('/dashboard');
        return { apiError: undefined };
    } else {
        return {
            apiError: undefined
        };
    }
}