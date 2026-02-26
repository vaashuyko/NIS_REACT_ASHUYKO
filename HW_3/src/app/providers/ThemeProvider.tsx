import { type ReactNode, useEffect } from "react";
import { selectTheme } from "../../features/settings";
import { useAppSelector } from "../store/hooks";

type Props = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
    const theme = useAppSelector(selectTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return <>{children}</>;
};