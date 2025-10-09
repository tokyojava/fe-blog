import { NextResponse } from "next/server";
import { fetchUser, serverError } from "./server_utils";
import { redirect } from "next/navigation";

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


export interface ActionApiHandler<T> {
    handler: () => Promise<T>;
    isServerAction: boolean;
    skipUserValidation: boolean;
}

export async function handleApi<T>(options: ActionApiHandler<T>) {
    try {
        if (!options.skipUserValidation) {
            const user = await fetchUser();
            if (!user) {
                throw new APIException(API_ERRORS.TOKEN_INVALID, 401);
            }
        }

        const data = await options.handler();
        return options.isServerAction ? ok(data) : NextResponse.json(ok(data));
    } catch (e) {
        serverError(e);
        if (e instanceof APIException) {
            if (e.status === 401) {
                redirect('/login?invalid=true');
            }

            return options.isServerAction ? fail(e.code, e.message) : NextResponse.json(fail(e.code, e.message));
        }
        return options.isServerAction ?
            fail(API_ERRORS.INTERNAL_SERVER_ERROR.code, API_ERRORS.INTERNAL_SERVER_ERROR.message)
            : NextResponse.json(fail(API_ERRORS.INTERNAL_SERVER_ERROR.code, API_ERRORS.INTERNAL_SERVER_ERROR.message));
    }
}