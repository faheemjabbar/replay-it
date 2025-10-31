const SENSITIVE_HEADERS = [
    'authorization',
    'cookie',
    'x-api-key',
    'x-auth-token',
];
const SENSITIVE_BODY_KEYS = [
    'password',
    'token',
    'secret',
    'apiKey',
    'creditCard',
];
export function redactHeaders(headers) {
    const redacted = { ...headers };
    SENSITIVE_HEADERS.forEach(key => {
        if (redacted[key]) {
            redacted[key] = '[REDACTED]';
        }
    });
    return redacted;
}
export function redactBody(body) {
    try {
        const parsed = JSON.parse(body);
        SENSITIVE_BODY_KEYS.forEach(key => {
            if (parsed[key]) {
                parsed[key] = '[REDACTED]';
            }
        });
        return JSON.stringify(parsed);
    }
    catch {
        return body; // Not JSON, return as-is
    }
}
