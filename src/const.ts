export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export const TOKEN_VALIDATION_INTERVAL = 7;//7 days