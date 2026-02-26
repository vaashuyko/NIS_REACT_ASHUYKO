import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru.json";
import en from "./locales/en.json";

export const I18N_DEFAULT_LANGUAGE = "ru";
export const I18N_FALLBACK_LANGUAGE = "ru";

void i18n.use(initReactI18next).init({
    resources: {
        ru: { translation: ru },
        en: { translation: en },
    },
    lng: I18N_DEFAULT_LANGUAGE,
    fallbackLng: I18N_FALLBACK_LANGUAGE,
    interpolation: { escapeValue: false },
});

export default i18n;