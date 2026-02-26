import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { I18nProvider } from "./I18nProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ErrorBoundary } from "../../shared/ui";

type Props = {
    children: ReactNode;
};

export const AppProviders = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <I18nProvider>
                <ThemeProvider>
                    <ErrorBoundary>{children}</ErrorBoundary>
                </ThemeProvider>
            </I18nProvider>
        </Provider>
    );
};