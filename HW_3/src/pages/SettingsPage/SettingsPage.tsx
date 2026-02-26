import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    selectLanguage,
    selectProductsPageSize,
    selectTheme,
    setLanguage,
    setProductsPageSize,
    setTheme,
} from "../../features/settings";
import type { Language } from "../../features/settings";
import { Card, Button } from "../../shared/ui";

const PAGE_SIZES: readonly number[] = [8, 12, 16, 24] as const;

export default function SettingsPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const theme = useSelector(selectTheme);
    const language = useSelector(selectLanguage);
    const pageSize = useSelector(selectProductsPageSize);

    const languageLabel = useMemo(() => {
        return language === "ru" ? t("settings.ru") : t("settings.en");
    }, [language, t]);

    return (
        <div className="page">
            <h1>{t("settings.title")}</h1>

            <Card>
                <div className="row">
                    <div className="rowLabel">{t("settings.theme")}</div>
                    <div className="rowValue settingsRowValue">
                        <Button
                            variant={theme === "light" ? "primary" : "secondary"}
                            onClick={() => dispatch(setTheme("light"))}
                        >
                            {t("settings.light")}
                        </Button>
                        <Button
                            variant={theme === "dark" ? "primary" : "secondary"}
                            onClick={() => dispatch(setTheme("dark"))}
                        >
                            {t("settings.dark")}
                        </Button>
                    </div>
                </div>

                <div className="row">
                    <div className="rowLabel">{t("settings.language")}</div>
                    <div className="rowValue settingsRowValue">
                        <select
                            value={language}
                            onChange={(e) => dispatch(setLanguage(e.target.value as Language))}
                        >
                            <option value="ru">{t("settings.ru")}</option>
                            <option value="en">{t("settings.en")}</option>
                        </select>
                        <span className="muted">{languageLabel}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="rowLabel">{t("settings.pageSize")}</div>
                    <div className="rowValue settingsRowValue">
                        <select
                            value={pageSize}
                            onChange={(e) => dispatch(setProductsPageSize(Number(e.target.value)))}
                        >
                            {PAGE_SIZES.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>
        </div>
    );
}