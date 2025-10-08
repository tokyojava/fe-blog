"use server";
import { connectToDatabase } from "@/db/driver";
import { AlreadyInUseError } from "@/lib/custom_errors";
import { serverError } from "@/lib/server_utils";
import { fromFormData } from "@/lib/utils";
import { createEmailPasswordUser } from "@/model/users";
import { CreateEmailUserZodSchema } from "@/types/user";
import { redirect } from "next/navigation";

export type SignUpActionServerSideState = {
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
                return { apiError: e.message };
            }
            return { apiError: "Internal server error" };
        }

        redirect('/login');
        return { apiError: undefined };
    } else {
        return {
            apiError: "Invalid input data, this should not happen"
        };
    }
}