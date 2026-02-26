import { type ReactNode, useEffect } from "react";
import { selectLanguage } from "../../features/settings";
import i18n from "../../shared/i18n/i18n";
import { useAppSelector } from "../store/hooks";

type Props = {
    children: ReactNode;
};

export const I18nProvider = ({ children }: Props) => {
    const language = useAppSelector(selectLanguage);

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [language]);

    return <>{children}</>;
};