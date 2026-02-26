import type { SettingsState } from "./types";

type SettingsRootState = {
    settings: SettingsState;
};

export const selectTheme = (state: SettingsRootState) => state.settings.theme;
export const selectLanguage = (state: SettingsRootState) => state.settings.language;
export const selectProductsPageSize = (state: SettingsRootState) => state.settings.productsPageSize;