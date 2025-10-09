"use server";
import { connectToDatabase } from "@/db/driver";
import { API_ERRORS, APIException, handleApi } from "@/lib/api";
import { createEmailPasswordUser } from "@/model/users";
import { CreateEmailUserRequest, CreateEmailUserZodSchema } from "@/types/user";


export async function signUpAction(req: CreateEmailUserRequest) {
    return handleApi({
        handler: async () => {
            const result = await CreateEmailUserZodSchema.safeParseAsync(req);
            await connectToDatabase();
            if (result.success) {
                await createEmailPasswordUser(result.data);
            } else {
                throw new APIException(API_ERRORS.SERVER_SIDE_VALIDATION_ERROR);
            }
        },
        isServerAction: true,
        skipUserValidation: true,
    });
}