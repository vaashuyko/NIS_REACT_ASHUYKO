type FetchErrorWithStatus = {
    status: number;
    data?: unknown;
};

type FetchErrorWithStringStatus = {
    status: string;
    data?: unknown;
};

type SerializedErrorLike = {
    message?: string;
};

const INVALID_CREDENTIALS_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const FORBIDDEN_STATUS = 403;
const NOT_FOUND_STATUS = 404;

const SERVER_ERROR_MIN = 500;
const SERVER_ERROR_MAX = 599;

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

const getStatus = (e: unknown): number | null => {
    if (!isObject(e)) return null;
    const status = e.status;
    if (typeof status === "number") return status;
    return null;
};

const getStringStatus = (e: unknown): string | null => {
    if (!isObject(e)) return null;
    const status = e.status;
    if (typeof status === "string") return status;
    return null;
};

const getDataMessage = (e: unknown): string | null => {
    if (!isObject(e)) return null;
    const data = e.data;
    if (!isObject(data)) return null;
    const message = data.message;
    if (typeof message === "string" && message.trim().length > 0) return message.trim();
    return null;
};

const getSerializedMessage = (e: unknown): string | null => {
    if (!isObject(e)) return null;
    const msg = (e as SerializedErrorLike).message;
    if (typeof msg === "string" && msg.trim().length > 0) return msg.trim();
    return null;
};

export const mapApiErrorToI18nKey = (error: unknown): string => {
    const sNum = getStatus(error);
    const sStr = getStringStatus(error);

    if (sStr && sStr.toUpperCase().includes("FETCH_ERROR")) return "apiErrors.network";
    if (sStr && sStr.toUpperCase().includes("PARSING_ERROR")) return "apiErrors.unknown";
    if (sStr && sStr.toUpperCase().includes("TIMEOUT_ERROR")) return "apiErrors.network";

    if (sNum === INVALID_CREDENTIALS_STATUS) return "apiErrors.invalidCredentials";
    if (sNum === UNAUTHORIZED_STATUS) return "apiErrors.unauthorized";
    if (sNum === FORBIDDEN_STATUS) return "apiErrors.forbidden";
    if (sNum === NOT_FOUND_STATUS) return "apiErrors.notFound";

    if (sNum !== null && sNum >= SERVER_ERROR_MIN && sNum <= SERVER_ERROR_MAX) {
        return "apiErrors.server";
    }

    const msg = getDataMessage(error) ?? getSerializedMessage(error);
    if (msg) {
        const lower = msg.toLowerCase();
        if (lower.includes("invalid") && lower.includes("credential")) return "apiErrors.invalidCredentials";
        if (lower.includes("unauthorized")) return "apiErrors.unauthorized";
    }

    return "apiErrors.unknown";
};

export const getApiErrorDebugMessage = (error: unknown): string | null => {
    const msg = getDataMessage(error) ?? getSerializedMessage(error);
    return msg ?? null;
};

export const isFetchError = (error: unknown): error is FetchErrorWithStatus | FetchErrorWithStringStatus => {
    if (!isObject(error)) return false;
    return "status" in error;
};