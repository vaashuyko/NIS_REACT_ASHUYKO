import { Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "./routes";
import { useAppSelector } from "../store/hooks";
import { selectAuthStatus, selectIsAuthenticated } from "../../features/auth";

export const ProtectedRoute = () => {
    const { t } = useTranslation();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const status = useAppSelector(selectAuthStatus);

    if (status === "loading") {
        return <div className="page">{t("common.loading")}</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <Outlet />;
};