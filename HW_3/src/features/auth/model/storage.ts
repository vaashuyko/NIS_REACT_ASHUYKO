export const AUTH_TOKEN_KEY = "ECOM_ADMIN_TOKEN";

export const readToken = (): string | null => {
    const v = localStorage.getItem(AUTH_TOKEN_KEY);
    return v && v.length > 0 ? v : null;
};

export const writeToken = (token: string | null): void => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }
};