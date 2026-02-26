import type {SettingsState} from "./types";

export const SETTINGS_KEY = "ECOM_ADMIN_SETTINGS";

const DEFAULT_SETTINGS: SettingsState = {
    theme: "light",
    language: "ru",
    productsPageSize: 12,
};

export const readSettings = (): SettingsState => {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;

    try {
        const parsed = JSON.parse(raw) as Partial<SettingsState>;
        const theme = parsed.theme === "dark" ? "dark" : "light";
        const language = parsed.language === "en" ? "en" : "ru";
        const productsPageSize =
            typeof parsed.productsPageSize === "number" && parsed.productsPageSize > 0
                ? parsed.productsPageSize
                : DEFAULT_SETTINGS.productsPageSize;

        return { theme, language, productsPageSize };
    } catch {
        return DEFAULT_SETTINGS;
    }
};

export const writeSettings = (settings: SettingsState): void => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};