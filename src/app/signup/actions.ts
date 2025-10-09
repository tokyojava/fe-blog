"use server";
import { API_ERRORS, APIException, handleActionApi } from "@/lib/api";
import { createEmailPasswordUser } from "@/model/users";
import { CreateEmailUserRequest, CreateEmailUserZodSchema } from "@/types/user";


export async function signUpAction(req: CreateEmailUserRequest) {
    return handleActionApi({
        handler: async () => {
            const result = await CreateEmailUserZodSchema.safeParseAsync(req);
            if (result.success) {
                await createEmailPasswordUser(result.data);
            } else {
                throw new APIException(API_ERRORS.SERVER_SIDE_VALIDATION_ERROR);
            }
        },
        skipUserValidation: true,
    });
}