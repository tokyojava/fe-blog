"use server";
import { connectToDatabase } from "@/db/driver";
import { serverError } from "@/lib/server_utils";
import { fromFormData } from "@/lib/utils";
import { AlreadyInUseError, createEmailPasswordUser } from "@/model/users";
import { CreateEmailUserZodSchema } from "@/types/user"
import { redirect } from "next/navigation";

export type SignUpActionServerSideState = {
    serverValidationErrors: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    },
    apiError?: string;
}

export async function SignUpAction(prevState: SignUpActionServerSideState, formData: FormData): Promise<SignUpActionServerSideState> {
    const obj = fromFormData(formData);
    const result = await CreateEmailUserZodSchema.safeParseAsync(obj);
    if (result.success) {
        try {
            await connectToDatabase();
            await createEmailPasswordUser(result.data);
        } catch (e: unknown) {
            serverError(e);
            if (e instanceof AlreadyInUseError) {
                return { serverValidationErrors: {}, apiError: e.message };
            }
            return { serverValidationErrors: {}, apiError: "Internal server error" };
        }

        redirect('/login');
        return { serverValidationErrors: {}, apiError: undefined };
    } else {
        return {
            serverValidationErrors: result.error.flatten().fieldErrors,
            apiError: undefined
        };
    }
}