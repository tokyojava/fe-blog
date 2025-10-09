import { NextResponse } from "next/server";
import { fetchUser, serverError } from "./server_utils";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/db/driver";
import { TokenPayload } from "./token";

export type APISuccess<T> = {
    data: T;
    success: true;
    error: null;
}

export type APIError = {
    data: null;
    success: false;
    error: {
        code: string;
        message: string;
    }
}

export type APIResponse<T> = NextResponse<APISuccess<T>> | NextResponse<APIError>;
export type ActionAPIResponse<T> = APISuccess<T> | APIError;

export function ok<T>(data: T): APISuccess<T> {
    return {
        data,
        success: true,
        error: null,
    }
}

export function fail(code: string, message: string): APIError {
    return {
        data: null,
        success: false,
        error: {
            code,
            message,
        }
    }
}


export class APIException extends Error {
    code: string;
    constructor(error: (typeof API_ERRORS)[keyof typeof API_ERRORS], public status = 400) {
        super(error.message);
        this.code = error.code;
    }
}

export const API_ERRORS = {
    INTERNAL_SERVER_ERROR: {
        code: "101",
        message: "Internal server error",
    },
    EMAIL_ALREADY_IN_USE: {
        code: "102",
        message: "Email is already in use",
    },
    SERVER_SIDE_VALIDATION_ERROR: {
        code: "103",
        message: "Server side validation error, this usually indicates a bug",
    },
    TOKEN_INVALID: {
        code: "104",
        message: "Token is invalid, need re-login",
    },
    EMAIL_PASSWORD_INCORRECT: {
        code: "105",
        message: "Email or password is incorrect",
    },
}


export interface ApiHandler<T> {
    handler: (user: TokenPayload | null) => Promise<T>;
    skipUserValidation: boolean;
}

async function handleApiBase<T>(options: ApiHandler<T>, responseWrapper: (result: APISuccess<T> | APIError) => any) {
    let user: TokenPayload | null = null;
    try {

        // Make sure to connect to database first
        await connectToDatabase();

        if (!options.skipUserValidation) {
            user = await fetchUser();
            if (!user) {
                redirect('/login?invalid=true');
            }
        }

        const data = await options.handler(user);
        return responseWrapper(ok(data));
    } catch (e) {
        serverError(e);
        if (e instanceof APIException) {
            return responseWrapper(fail(e.code, e.message));
        }
        return responseWrapper(fail(API_ERRORS.INTERNAL_SERVER_ERROR.code, API_ERRORS.INTERNAL_SERVER_ERROR.message));
    }
}

export async function handleActionApi<T>(options: ApiHandler<T>) {
    return handleApiBase(options, (result) => result);
}

export async function handleApi<T>(options: ApiHandler<T>) {
    return handleApiBase(options, (result) => NextResponse.json(result));
}
