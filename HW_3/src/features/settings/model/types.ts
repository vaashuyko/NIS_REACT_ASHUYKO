export type Theme = "light" | "dark";
export type Language = "ru" | "en";

export type SettingsState = {
    theme: Theme;
    language: Language;
    productsPageSize: number;
};

