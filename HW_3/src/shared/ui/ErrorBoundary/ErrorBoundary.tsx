import React, { type ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    children: ReactNode;
};

type BoundaryState = {
    hasError: boolean;
    error: Error | null;
};

type InnerProps = {
    children: ReactNode;
    title: string;
    description: string;
    reloadLabel: string;
    homeLabel: string;
    detailsLabel: string;
};

class ErrorBoundaryInner extends React.Component<InnerProps, BoundaryState> {
    public state: BoundaryState = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): BoundaryState {
        return { hasError: true, error };
    }

    public componentDidCatch() {}

    private onReload = () => {
        window.location.reload();
    };

    private onHome = () => {
        window.location.assign("/");
    };

    public render() {
        const { hasError, error } = this.state;

        if (!hasError) return this.props.children;

        return (
            <div className="errorBoundaryPage">
                <div className="errorBoundaryCard">
                    <div className="errorBoundaryIcon" aria-hidden="true">
                        !
                    </div>

                    <div className="errorBoundaryTitle">{this.props.title}</div>
                    <div className="errorBoundaryDesc">{this.props.description}</div>

                    <div className="errorBoundaryActions">
                        <button className="btn" onClick={this.onReload}>
                            {this.props.reloadLabel}
                        </button>
                        <button className="btn secondary" onClick={this.onHome}>
                            {this.props.homeLabel}
                        </button>
                    </div>

                    {error ? (
                        <details className="errorBoundaryDetails">
                            <summary>{this.props.detailsLabel}</summary>
                            <pre className="errorBoundaryPre">{String(error.stack ?? error.message)}</pre>
                        </details>
                    ) : null}
                </div>
            </div>
        );
    }
}

export const ErrorBoundary = ({ children }: Props) => {
    const { t } = useTranslation();

    return (
        <ErrorBoundaryInner
            title={t("errorBoundary.title")}
            description={t("errorBoundary.description")}
            reloadLabel={t("errorBoundary.reload")}
            homeLabel={t("errorBoundary.home")}
            detailsLabel={t("errorBoundary.details")}
        >
            {children}
        </ErrorBoundaryInner>
    );
};