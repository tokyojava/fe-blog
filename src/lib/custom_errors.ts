export class AlreadyInUseError extends Error {
    constructor() {
        super("Email is already in use'");
    }
}

export class TokenTimeoutError extends Error {
    constructor() {
        super("Token has expired, please login again");
    }
}

export class InvalidBlogIdError extends Error {
    constructor(id: string) {
        super(`The provided blog ID '${id}' is invalid`);
    }
}